import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { AnamneseService } from "./anamnese.service";
import { CreateAnamneseDTO } from "./dto/create-anamnese.dto";
import { UpdatePutAnamneseDTO } from "./dto/update-put-anamnese.dto";
import { UpdatePatchAnamnese } from "./dto/update-patch-anamnese.dto";

@Controller('anamneses')
export class AnamneseController {
    constructor(private readonly AnamneseService: AnamneseService ) {
    }

    @Post()
    async create(@Body() data: CreateAnamneseDTO) {
        return this.AnamneseService.create(data);
    }

    @Get()
    async list() {
        return this.AnamneseService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
       return this.AnamneseService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutAnamneseDTO, @Param('id', ParseIntPipe) id:number) {
        return this.AnamneseService.update(id,data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchAnamnese, @Param('id', ParseIntPipe) id:number) {
        return this.AnamneseService.updatePartial(id,data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number) {
        return this.AnamneseService.delete(id);
    }
}