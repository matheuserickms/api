import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { ClinicalRecordService } from "./clinical-record.service";
import { CreateClinicalRecordDTO } from "./dto/create-clinical-recrod.dto";
import { UpdatePutClinicalRecordDTO } from "./dto/update-put-clinical-record.dto";
import { UpdatePatchClinicalRecordDTO } from "./dto/update-patch-clinical-record.dto";

@Controller('clinical-records')
export class ClinicalRecordController {
    constructor(private readonly ClinicalRecordService:ClinicalRecordService) {}

    @Post()
    async create(@Body() data: CreateClinicalRecordDTO) {
        return this.ClinicalRecordService.create(data);
    }

    @Get()
    async list() {
        return this.ClinicalRecordService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.ClinicalRecordService.show(id);
    } 

    @Put(':id')
    async update(@Body() data: UpdatePutClinicalRecordDTO, @Param('id', ParseIntPipe) id:number) {
        return this.ClinicalRecordService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchClinicalRecordDTO, @Param('id', ParseIntPipe) id:number) { 
        return this.ClinicalRecordService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.ClinicalRecordService.delete(id);
    }


}
