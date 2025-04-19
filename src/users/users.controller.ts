import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UsersService } from './users.service';
import { UsersPipe } from './users.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly userServices: UsersService) { }
    @Get()
    getUsers() {
        return this?.userServices?.fetchUsers()
    }

    @Get('posts')
    getUserPosts() {
        return [{
            username: "John",
            email: "john@gmail.com",
            posts: [{
                title: "Post 1",
                content: "Content 1"
            }, {
                title: "Post 2",
                content: "Content 2"
            }]
        }, {
            username: "Jane",
            email: "jane@gmail.com",
            posts: [{
                title: "Post 3",
                content: "Content 3"
            }]
        }]
    }

    @Get('/posts/comments')
    getUserPostsComments() {
        return [{
            username: "John",
            email: "john@gmail.com",
            posts: [{
                title: "Post 1",
                content: "Content 1",
                comments: [{
                    content: "Comment 1"
                }, {
                    content: "Comment 2"
                }]

            }]

        }]
    }

    @Post()
    @UseGuards(AuthGuard)
    createUser(@Body(UsersPipe) userData: CreateUserDto) {
        const id = Number(new Date());
        console.log(id, "User ID");
        return this?.userServices?.createUser({ ...userData, id })
    }

    @Get(':id/:postId')
    getUserById(@Param('id', ParseIntPipe) id: number, @Param('postId', ParseIntPipe) postId: number) {
        console.log(id, "User ID", postId, "Post ID");
        return { message: "User fetched", id, postId }
    }

    @Get(':id')
    getUserByQuery(@Param('id', ParseIntPipe) id: number, @Query('sortBy') sortBy: string, @Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
        console.log(sortBy, "Sort By", sortDesc, "Sort Desc");
        return this?.userServices?.getUserById(id);
    }
}
