'use strict'
const Cart = use('App/Models/Cart') 
const Database = use('Database')
class CartController {

    async showCarts({response,auth}){
        let user;
        try {
            user = await auth.getUser()
        } catch (error) {
            return response.status(401).json({
              'success': false, 
                message: 'You are not authorized!'
            })
        }
        let allCarts =  await Cart.query().where('userId',user.id).with('mproduct').with('vproduct').fetch();
        if(!allCarts){
            allCarts = []
        }
        return response.status(200).json({
            'success': true,
            allCarts : allCarts,
        });
    }
    async storeCart({response,request,auth}){
        let data = request.all();
        let user;
        try {
            user = await auth.getUser()
        } catch (error) {
            return response.status(401).json({
              'success': false,
                message: 'You are not authorized!'
            })
        }
        
        let allCarts;
        let isNew = true;
        let isCarted =   await Cart.query().where('userId',user.id).where('productId',data.id).with('mproduct').with('vproduct').first();
        if(isCarted){
            isCarted = isCarted.toJSON();
            let newQuantity = isCarted.vproduct.quantity + data.quantity
            if(newQuantity > isCarted.stock){
                return response.status(401).json({
                    'success': false,
                    message: 'Product out of stock!'
                })
            }
            await Cart.query().where('id',isCarted.id).update({
                'quantity' : Database.raw(`quantity +${data.quantity}`)
            });
             allCarts =  await Cart.query().where('userId',user.id).with('mproduct').with('vproduct').fetch();
             isNew = false
        }
        else {
            let jsonProduct = JSON.stringify(data)
            let newCart = await Cart.create({
                'userId':user.id,
                'productId':data.id,
                'mproductId':data.mproductId,
                'categoryId':data.groupId,
                'subcategoryId':data.categoryId,
                'quantity':data.quantity,
                'product':jsonProduct,
            })

             allCarts =  await Cart.query().where('userId',user.id).with('mproduct').with('vproduct').fetch();
        }
        return response.status(200).json({
            'success': true,
            'isNew': isNew,
            allCarts : allCarts,
        });
    }
    async updateCart({response,request,auth}){
        let data = request.all();
        let user;
        try {
            user = await auth.getUser()
        } catch (error) {
            return response.status(401).json({
              'success': false,
                message: 'You are not authorized!'
            })
        }
        await Cart.query().where('id',data.id).update({
            'quantity' : data.quantity
        });
        let product =  await Cart.query().where('id',data.id).with('mproduct').with('vproduct').first();
        
     
        return response.status(200).json({
            'success': true,
            product : product,
        });
    }
    async deleteCart({response,request,auth}){
        let data = request.all();
        let user;
        try {
            user = await auth.getUser()
        } catch (error) {
            return response.status(401).json({
              'success': false,
                message: 'You are not authorized!'
            })
        }
        await Cart.query().where('id',data.id).delete();
        
        
     
        return response.status(200).json({
            'success': true,
        });
    }
}

module.exports = CartController
