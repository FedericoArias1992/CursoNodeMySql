const{ Model, DataTypes, Sequelize }=require('sequelize');
const{ CATEGORY_TABLE }=require('./category.models');  //importamos para hacer la asociacion
const PRODUCT_TABLE='products';

const ProductSchema={
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,type:DataTypes.INTEGER
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  description:{
    type:DataTypes.TEXT,allowNull:false,
  },
  price:{
    type:DataTypes.INTEGER,allowNull:false,
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'created_at',
    defaultValue:Sequelize.NOW,
  },
  categoryId:{
    field:'category_id',       //definiemos la relacion categoria (1 to) -> producto(Many)
    allowNull:false,
    type:DataTypes.INTEGER,
    references:{
      model:CATEGORY_TABLE,
      key:'id'
    },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'}
}

class Product extends Model{
  static associate(models){   //adentro va
    this.belongsTo(models.Category,{as:'category'});  //notar que el producto pertenece a UNA categoria
  }                                                  //desde categoria la relacion es category hasMany products
static config(sequelize){
  return{sequelize,
    tableName:PRODUCT_TABLE,
    modelName:'Product',
    timestamps:false}
  }
}
module.exports={Product,ProductSchema,PRODUCT_TABLE};
