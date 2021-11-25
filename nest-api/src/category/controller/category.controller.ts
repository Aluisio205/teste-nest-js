import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Category } from "../entity/category.entity";
import { Result } from "../../back/entity/result.model";
import { CategoryService } from "../service/category.service";
import { CategoryValidator } from "../validator/category.validator";
import { ValidatorInterceptor } from "../../back/validators/interceptor.validator";


@Controller('category')
export class CategoryController {

    constructor(private repository: CategoryService) { }

    @Get()
    async get() {
        try {
            const category = await this.repository.get();
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter as categorias.', false, null, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        try {
            const category = await this.repository.getById(id);
            return new Result(null, true, category, null);
        } catch (error) {
            return new Result('Falha ao obter a categoria por ID', false, null, HttpStatus.BAD_REQUEST)
        }
    }

    @Post()
   //@UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async post(@Body() model: Category) {
        try {
            await this.repository.post(model);
            return new Result('Categoria cadastrado com sucesso.', true, model, HttpStatus.CREATED)
        } catch (error) {
            return new Result('Falha ao cadastrar a categoria', false, model, HttpStatus.BAD_REQUEST)

        }
    }

    @Put(':id')
   // @UseInterceptors(new ValidatorInterceptor(new CategoryValidator()))
    async put(@Body() model: Category, @Param('id') id: number) {
        try {
            await this.repository.put(id, model);
            return new Result('Categoria atualizado com sucesso.', true, model, HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao atualizar a categoria', false, [], HttpStatus.BAD_REQUEST)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.repository.delete(id)
            return new Result('Categoria deletado com sucesso.', true, [], HttpStatus.OK)

        } catch (error) {
            return new Result('Falha ao deletar a categoria', false, null, HttpStatus.BAD_REQUEST)

        }
    }
}