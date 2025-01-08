import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true,
})
export class User {

    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    role: number;

    @Prop()
    balance: number;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);