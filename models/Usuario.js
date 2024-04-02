import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Usuario = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    eAdmin: {
        type: Number,
        default: 0
    },
    token: {
        type: String, 
        default: "/imgs/tokens/login.png"
    },
    gameSaves: {
        type: Schema.Types.Mixed,
        ref: "fichas",
        default: {
            save1: null,
            save2: null,
            save3: null,
            save4: null
        }
    }, 
    date: {
        type: Date,
        default: Date.now()
    } 
});

mongoose.model("usuarios", Usuario);
export default Usuario;