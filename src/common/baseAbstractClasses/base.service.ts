import { PrismaService } from 'nestjs-prisma';
import { ResponseDefaultType } from 'src/common/types/responseDefault';

export class BaseService {
  public collectionName = null;
  public prisma: PrismaService = null;

  async all(): Promise<ResponseDefaultType> {
    const all = await this.prisma[this.collectionName].findMany({});

    return {
      success: true,
      data: all,
    };
  }

  async byId(id: string): Promise<ResponseDefaultType> {
    const unique = await this.prisma[this.collectionName].findUnique({
      where: { id: id },
    });

    return {
      success: true,
      data: unique,
    };
  }

  async oneByQuery(query: any): Promise<ResponseDefaultType> {
    const unique = await this.prisma[this.collectionName].findUnique({
      where: query,
    });

    return {
      success: true,
      data: unique,
    };
  }

  async byQuery(query: any): Promise<ResponseDefaultType> {
    const many = await this.prisma[this.collectionName].findMany({
      where: query,
    });

    return {
      success: true,
      data: many,
    };
  }

  async create(data: any): Promise<ResponseDefaultType> {
    delete data.id; // remove id from data
    const created = await this.prisma[this.collectionName].create({
      data,
    });

    return {
      success: true,
      data: created,
    };
  }

  async update(id: string, data: any): Promise<ResponseDefaultType> {
    delete data.id; // remove id from data
    data.updated = new Date().toISOString();
    const updated = await this.prisma[this.collectionName].update({
      data,
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: updated,
    };
  }

  async delete(id: string): Promise<ResponseDefaultType> {
    const deleted = await this.prisma[this.collectionName].delete({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: deleted,
    };
  }
}
