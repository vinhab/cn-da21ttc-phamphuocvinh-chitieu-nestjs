import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Source } from './schemas/source.schema';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Injectable()
export class SourcesService {
  constructor(@InjectModel(Source.name) private readonly sourceModel: Model<Source>) {}

  async create(createSourceDto: CreateSourceDto): Promise<Source> {
    const newSource = new this.sourceModel(createSourceDto);
    return newSource.save();
  }

  async findAll(): Promise<Source[]> {
    return this.sourceModel.find().exec();
  }

  async findOne(id: string): Promise<Source> {
    const source = await this.sourceModel.findById(id).exec();
    if (!source) throw new NotFoundException(`Source with ID ${id} not found`);
    return source;
  }

  async findAllByUserId(userId: string): Promise<Source[]> {
      return this.sourceModel.find({ userId: userId }).exec();
  }

  async update(id: string, updateSourceDto: UpdateSourceDto): Promise<Source> {
    const updatedSource = await this.sourceModel
      .findByIdAndUpdate(id, updateSourceDto, { new: true })
      .exec();
    if (!updatedSource) throw new NotFoundException(`Source with ID ${id} not found`);
    return updatedSource;
  }

  async remove(id: string): Promise<void> {
    const result = await this.sourceModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Source with ID ${id} not found`);
  }
}
