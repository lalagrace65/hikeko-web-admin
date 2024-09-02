import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import axios  from "axios";
import { 
    Card,
    CardHeader,
    Typography,
    Input,
    Button,
    CardBody,
 } from "@material-tailwind/react";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
    EllipsisVerticalIcon,
  } from "@heroicons/react/24/outline";
import ActionModal from "@/components/ActionModal/ActionModal";
import { withSwal } from 'react-sweetalert2';


function Categories ({swal}){
        const [editedCategory,setEditedCategory] = useState(null);
        const [name, setName] = useState('');
        const [categories,setCategories]= useState([]);
        const [parentCategory, setParentCategory] = useState('');
        const [open, setModalOpen] = useState(false);
        const [properties,setProperties] = useState([]);
        const TABLE_HEAD = ['Category name', 'Parent Category','Status', 'Action'];

        //to make it realtime on table
        useEffect(() => {
            fetchCategories();
        }, []);
        // get the info of categories
        function fetchCategories(){
            axios.get('/api/categories').then(response => {
                setCategories(response.data);
            });
        }
        //post new category
        async function saveCategory(ev){
            ev.preventDefault();
            const data = {
                name,
                parentCategory: parentCategory,
                properties: properties.map(p => ({
                    name:p.name, 
                    values:p.values.split(','),
                })),
            };
            if(editedCategory){
                data._id = editedCategory._id;
                await axios.put('/api/categories', data);
                setEditedCategory(null);
            } else {
                await axios.post('/api/categories', data);
            }
            setName('');
            setParentCategory('');
            setProperties([]);
            fetchCategories(); // need this to make realtime in table
        }
    
        //edit the category
        function editCategory(category) {
            setEditedCategory(category);
            setName(category.name); // Set the input field with the category name
            setParentCategory(category.parent?._id || ''); // Set the parent category if it exists
            setProperties(
                category.properties.map(({name, values}) => ({
                    name,
                    values:values.join(',')
                }))
            );
        }

        function deleteCategory(category){
            swal.fire({
                title: 'Are you sure?',
                text: `Do you want to delete ${category.name}?`,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Yes',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                if(result.isConfirmed){
                    const{_id} = category;
                    await axios.delete('/api/categories?_id='+_id);
                    fetchCategories();
                }
            });
        }
        function addProperty(){
            setProperties(prev => {
                return [...prev, {name:'', values: ''}]
            });
        }
        function handlePropertyNameChange(index,property,newName){
            setProperties(prev => {
                const properties = [...prev];
                properties[index].name = newName;
                return properties;
            });
        }
        function handlePropertyValuesChange(index,property,newValues){
            setProperties(prev => {
                const properties = [...prev];
                properties[index].values = newValues;
                return properties;
            });
        }
        function removeProperty(indexToRemove){
            setProperties(prev => {
                return[...prev].filter((p,pIndex) =>{
                    return pIndex !== indexToRemove;
                });
            });
        }

        return (
            <Layout>
                <h1>Categories</h1>
                <label>
                    {editedCategory 
                    ? `Edit category ${editedCategory.name}` 
                    : 'Create new category'}
                </label>
                <form  onSubmit={saveCategory}>
                    <div className="flex gap-1">
                        <input 
                            type="text" 
                            placeholder={'Category name'}
                            onChange={ev => setName(ev.target.value)}
                            value={name}/> 
                        {/* Select options */}
                        <select
                                onChange={ev => setParentCategory(ev.target.value)}
                                value={parentCategory}>
                            <option value=''>No parent category</option>
                            {categories.length >0  && categories.map(category =>(
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block">Properties</label>
                        <button 
                            onClick={addProperty}
                            type='button'
                            className="btn-default text-sm mb-2">
                        Add new property
                        </button>
                        {properties.length > 0 && properties.map((property, index) =>(
                            <div key={index} className="flex gap-1 mb-2">
                                <input  type='text' 
                                        value={property.name} 
                                        className="mb-0"
                                        onChange={ev => handlePropertyNameChange(
                                            index,
                                            property,
                                            ev.target.value)}
                                        placeholder="property name(example: Region)"/>
                                <input type='text' 
                                        value={property.values}
                                        className="mb-0"
                                        onChange={ev => handlePropertyValuesChange(
                                            index,
                                            property,
                                            ev.target.value)}
                                        placeholder="values, comma separated"/>
                                <button 
                                    onClick={() => removeProperty(index)}
                                    type="button"
                                    className="btn-default">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>  
                    <div className='flex gap-1'>
                    {editedCategory && (
                        <button 
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                                setProperties([]);
                            }}
                            className="btn-default">
                        Cancel
                        </button> 
                    )} 
                    <button type="submit" 
                        className="btn-primary">
                        Save
                    </button>
                    </div>  
                </form>

                {/* Hide the table when click edit*/}
                    {!editedCategory && (
                    {/*
                    <Card className="h-full w-full pt-6">
                        <CardHeader floated={false} shadow={false} className="rounded-none">
                            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                                <div>
                                    <Typography variant="h5" color="blue-gray">
                                    Categories of HikeKo
                                    </Typography>
                                    <Typography color="gray" className="mt-1 font-normal">
                                    These are details about the trails
                                    </Typography>
                                </div>
                                <div className="flex w-full shrink-0 gap-2 md:w-max">
                                    <div className="w-full md:w-72 relative">
                                        <Input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <MagnifyingGlassIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    </div>
                                    <Button className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 text-white  px-4 py-2">
                                        <ArrowDownTrayIcon strokeWidth={2} className="h-5 w-5" />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody className="overflow-scroll px-0">
                        */},
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((header) => (
                                        <th                 
                                            key={header}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 font-normal"
                                        >
                                            {header}
                                        </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                {categories.length >0  && categories.map (category =>(
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category?.parent?.name}</td>
                                        <td>
                                            
                                        </td>
                                        <td>
                                        <button onClick={() => setModalOpen(true)}>
                                            <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                        <button onClick={()=> editCategory(category)}
                                        className="btn-primary mr-1"> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category)}
                                            className="btn-red">Delete
                                        </button>
                                        <ActionModal open={open} onClose={() => setModalOpen(false)}>
                                            <div className="text-center w-56">
                                                <img src="marker_flag.png" className="w-20 h-14"></img>
                                                <div className="mx-auto my-4 w-48">
                                                    <h3 className="text-lg font-black text-gray-800">
                                                        Confirm Delete</h3>
                                                        <p className="text-sm text-gray-500">
                                                            Are you sure you want to delete this item?
                                                        </p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button className="btn btn-danger w-full">
                                                    Delete
                                                    </button>
                                                    <button className="btn btn-light w-full" 
                                                        onClick={()=> setModalOpen(false)}>
                                                    Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </ActionModal>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                       // </CardBody>
                    //</Card>

                    )}
            </Layout>
        );
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal} />
));