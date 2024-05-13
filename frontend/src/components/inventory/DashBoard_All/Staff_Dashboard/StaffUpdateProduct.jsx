import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './StaffUpdateProduct.css';

function StaffUpdateProduct() {
  const { id } = useParams(); // Get the product id from the URL parameter
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    Manufactured_price: '',
    category: '',
    manufactureDate: '',
    expireDate: '',
    description: '',
    ingredients: '',
    quantity: '',
    image: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:8070/Product/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setFormData({
          ...res.data.product,
          manufactureDate: formatDate(res.data.product.manufactureDate),
          expireDate: formatDate(res.data.product.expireDate),
        }); // Initialize form data with product details and format dates
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the value is negative before updating the state
    if ((name === 'price' || name === 'Manufactured_price' || name === 'quantity') && parseFloat(value) < 0) {
      return; // Do not update state for negative values
    }
    setFormData({ ...formData, [name]: value });
  };

  
  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      // If image is uploaded, set it in formData
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      try {
        // If no image uploaded, fetch previous image from database
        const response = await axios.get(`http://localhost:8070/Product/${id}`);
        const previousImage = response.data.product.image;
        // Set previous image in formData
        setFormData({ ...formData, image: previousImage });
      } catch (error) {
        alert('Error fetching previous image');
        console.error(error);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('Manufactured_price', formData.Manufactured_price);
      formDataToSend.append('discount', formData.discount);
      formDataToSend.append('quantity', formData.quantity);
      
      formDataToSend.append('image', formData.image); // Append image file if available
      
      formDataToSend.append('expireDate', formData.expireDate);
      formDataToSend.append('manufactureDate', formData.manufactureDate);
      formDataToSend.append('ingredients', formData.ingredients);
      formDataToSend.append('action', 'Update'); // Set action to "Update"
      formDataToSend.append('ProductID', id);
      
      await axios.post(`http://localhost:8070/ApprovalProcess/updateProposal`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        }
      });
      
      alert('Product Updated Successfully');
      // Optionally, redirect to another page after successful submission
    } catch (error) {
      alert('Error occurred while updating product');
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-update-product-container">
      <h2 className="staffupdate-product-title">Update Product</h2>
      <form className="staff-update-product-form" onSubmit={handleSubmit}>
      
        <div className="staff-form-group">
          <label className="staff-form-label">Image:</label>
          <img src={require(`../../../../../../BACKEND/uploads/${product.image}`)} alt={product.name} className="staff-product-image" />
          <input type="file" name="image" onChange={handleImageChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Manufactured Price:</label>
          <input type="text" name="Manufactured_price" value={formData.Manufactured_price} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} className="staff-form-input"  required>
            <option value="">Select Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Face and Body Care">Face and Body Care</option>
            <option value="Pain and Safety">Pain and Safety</option>
            <option value="Others">Others</option>
            
          </select>
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Manufacture Date:</label>
          <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Expire Date:</label>
          <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Ingredients:</label>
          <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="staff-form-input" />
        </div>

        <div className="staff-form-group">
          <label className="staff-form-label">Quantity:</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="staff-form-input" />
        </div>

        <button type="submit" className="staff-submit-btn">Update</button>
      </form>
    </div>
  );
}

export default StaffUpdateProduct;
