import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Ficha = new Schema({
    nick: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    }, 
    gender: {
        type: String,
        required: true
    },
    ca: {
        type: Number,
        default: 10
    },
    hp: {
        type: Number,
        default: 10 
    },
    inventory: {
        type: Schema.Types.Mixed,
        default: {armas:{
            type: Array,
            default: ["Mão"],
        },
        armaduras:{
            type: Array,
            default: ["Roupa"]
        }}
    },
    money: {
        type: Number,
        default: 100 
    },
    attributes :{
        type: Schema.Types.Mixed,
        default: {
            for: 10,
            des: 10,
            con: 10,
            int: 10,
            sab: 10,
            car: 10  
        }
    }, 
    progress: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    } 
});

mongoose.model("fichas", Ficha);
export default Ficha;