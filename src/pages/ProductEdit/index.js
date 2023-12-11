import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Alert,Button,Container,Input,Label,Row,Col, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, updateProductAdmin } from '../../actions/productActions'
import types from '../../actions/types';


const ProductEdit = ({match, history}) => {

    const productId = match.params.id;
 
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    
    const currentProduct = useSelector(state => state.currentProduct);
    const {loading, error, product } = currentProduct;

    const currentUser = useSelector(state => state.currentUser);
    const { userInfo } = currentUser;

    const updateProduct = useSelector(state => state.updateProduct);
    const { error: updateError, success: updateSuccess } = updateProduct;


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductAdmin({
            _id: productId,
            name,
            price,
            image,
            ingredients,        
            countInStock,
            category,
            description
        }))
    }
    
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('https://chego-store-be.onrender.com/api/upload', formData, config);

            setImage(data)
            setUploading(false)
        } catch(err) {
            console.log(err);
            setUploading(false);
        }
    }
    useEffect(() => { 
        if(!userInfo){
            history.push('/login') 
        }else{
            if(updateSuccess){
                dispatch({type: types.PRODUCT_UPDATE_RESET});
                history.push('/admin/productList/page/1')
            }else{
                if(!product.name || product._id !== productId){
                    dispatch(fetchProduct(productId))
                } else {
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setIngredients(product.ingredients);                  
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                    setDescription(product.description);
                }
            }
        }
        //eslint-disable-next-line
    }, [history, userInfo, product._id, dispatch,updateSuccess])


    return (
      <div className='mb-4'>
        <h2 className='title text-light p-2 my-3 text-center'>Edit Product</h2>
        <Container>
          {/* <Link to="/admin/productlist/page/1">Go Back</Link> */}
          {updateError && <Alert severity="error">{updateError}</Alert>}
          {updateSuccess && (
            <Alert severity="success">Updated Successfully</Alert>
          )}
          <Container >
            <Row>
              <Col lg='12' className='d-flex align-items-center justify-content-center'>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <Alert severity="info">{"Updating..."}</Alert>}
            <form onSubmit={submitHandler} className='w-50'>
              <Label>Drink Name</Label>
              <Input
              className='mb-2'
                required
                margin="dense"           
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label>Ingredients</Label>
              <Input
              className='mb-2'
                required
                margin="dense"               
                label="ingredients"
                type="textarea"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <Label>Price</Label>
               <Input
               className='mb-2'
                required
                type="number"
                margin="dense"
                
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Label>Image</Label>
              
              <Input  type="file" className='mb-2' onChange={uploadImageHandler} />
              {uploading && <Spinner color='success' className='text-center'>Loading...</Spinner>}
              <Input
              className='mb-2'
                required
                margin="dense"
                placeholder='image path'
                label="Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Label id="select-genre">Category</Label>
              <Input
              
                label="select-genre"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="select"
              > <option defaultValue={"coffee"}>Choose...</option>     
                <option value={"tea"}>tea</option>
                <option value={"juice"}>juice</option>
                <option value={"milk"}>milk</option>
                <option value={"coffee"}>coffee</option>
              </Input>
              <br />
              <Label>Stock</Label>
              <Input
              className='mb-2'
                required
                margin="dense"
                type="number"               
                label="Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
              <Label>Description</Label>
              <Input
              className='mb-2'
                required
                margin="dense"        
                label="Description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button className='order-page mb-5 text-success border-0 w-100' type="submit">
                Submit
              </Button>
            </form>
            </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
}

export default ProductEdit;
