import { prisma } from "../../data/postgresql";
import {
  CreateDonationTransactionDto,
  UpdateDonationTransactionDto,
} from "../../domain";
import { DonationTransactionDataSource } from "../../domain/dataSource/DonationTransactionDataSource";
import {
  DonationTransaction,
  TransactionStatus,
} from "../../domain/entities/DonationTransaction";
import { HttpException } from "../../presentation/errors/httpException";

export class DonationTransactionDataSourceImpl
  implements DonationTransactionDataSource
{
  /**
   * Crea una nueva transacción de donación
   */
  async create(
    dto: CreateDonationTransactionDto
  ): Promise<DonationTransaction> {
    try {
      const donateTransaction = await prisma.donationTransaction.create({
        data: {
          status: (dto.status ?? "Reserved") as TransactionStatus,
          donationId: dto.donationId,
          receiverId: dto.receiverId,
        },
      });

      // Creamos instancia real de la entidad
      return new DonationTransaction(
        donateTransaction.id,
        donateTransaction.donationId,
        donateTransaction.receiverId,
        donateTransaction.status,
        donateTransaction.createdAt,
        donateTransaction.updatedAt
      );
    } catch (error) {
      console.error("Error creating donation transaction:", error);
      throw new Error("Error creating donation transaction");
    }
  }

  /**
   * Busca una transacción por ID
   */
  async findById(id: number): Promise<DonationTransaction | null> {
    try {
      const tx = await prisma.donationTransaction.findUnique({
        where: { id },
      });

      if (!tx) {
        throw new HttpException(404, "Transaction not found");
      }

      return new DonationTransaction(
        tx.id,
        tx.donationId,
        tx.receiverId,
        tx.status,
        tx.createdAt,
        tx.updatedAt
      );
    } catch (error) {
      console.error("Error finding donation transaction:", error);

      if (error instanceof HttpException) {
        // Propagar el 404 o cualquier HttpException personalizada
        throw error;
      }

      throw new HttpException(500, "Internal Server Error");
    }
  }

  /**
   * Obtiene todas las transacciones
   */
  async getAllTransactions(): Promise<DonationTransaction[]> {
    try {
      const txs = await prisma.donationTransaction.findMany({
        orderBy: { createdAt: "desc" },
      });

      return txs.map(
        (tx) =>
          new DonationTransaction(
            tx.id,
            tx.donationId,
            tx.receiverId,
            tx.status,
            tx.createdAt,
            tx.updatedAt
          )
      );
    } catch (error) {
      console.error("Error getting donation transactions:", error);
      throw new Error("Error getting donation transactions");
    }
  }

  /**
   * Actualiza una transacción
   */
  async update(
    id: number,
    dto: UpdateDonationTransactionDto
  ): Promise<DonationTransaction | null> {
    try {
      const tx = await prisma.donationTransaction.update({
        where: { id },
        data: {
          status: (dto.status ?? "Reserved") as TransactionStatus,
          updatedAt: new Date(),
        },
      });

      return new DonationTransaction(
        tx.id,
        tx.donationId,
        tx.receiverId,
        tx.status,
        tx.createdAt,
        tx.updatedAt
      );
    } catch (error) {
      console.error("Error updating donation transaction:", error);
      throw new Error("Error updating donation transaction");
    }
  }

  /**
   * Elimina una transacción
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.donationTransaction.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting donation transaction:", error);
      return false;
    }
  }
}
