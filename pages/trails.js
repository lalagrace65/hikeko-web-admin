import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Trails(){
    const [trails,setTrails] = useState([]);
    useEffect(() => {
        axios.get('/api/trails').then(response => {
            setTrails(response.data);
        });
    }, []);
    return(
        <Layout>
            <Link className="btn-primary" href={'/trails/new'}>Add new trail</Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Trail Name </td>
                        <td>Trail Class </td>
                        <td>Difficulty Level </td>
                        <td>Elevation</td>
                        <td>Description</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {trails.map(trail => (
                        <tr key={trail._id}>
                            <td>{trail.title}</td>
                            <td>{trail.trailClass}</td>
                            <td>{trail.difficultyLevel}</td>
                            <td>{trail.elevation}</td>
                            <td>{trail.description}</td>
                            <td>
                                <Link href={'/trails/edit/'+trail._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} stroke="currentColor" 
                                    className="w-4 h-4">
                                    <path strokeLinecap="round" 
                                    strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 
                                    1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897
                                    1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0
                                    0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 
                                    2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link href={'/trails/delete/'+trail._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                    strokeWidth={1.5} stroke="currentColor" 
                                    className="w-4 h-4">
                                    <path strokeLinecap="round" 
                                    strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 
                                    9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 
                                    19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 
                                    1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 
                                    .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 
                                    0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 
                                    1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
    
}
/*
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
 
const TABLE_HEAD = ["Trail Name", "Trail Class", "Difficulty", "Elevation", "Description", "Actions"];
 
 
export default function Trails() {
    const [trails,setTrails] = useState([]);
    useEffect(() => {
        axios.get('/api/trails').then(response => {
            setTrails(response.data);
        });
    }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              List of Mountains
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the mountains
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {trails.map((trail, index) => {
                            const isLast = index === trails.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

 
                return (
                  <tr key={trail._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {trail.title}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trail.trailClass}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trail.difficultyLevel}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trail.elevation}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {trail.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          color={
                            status === "paid"
                              ? "green"
                              : status === "pending"
                              ? "amber"
                              : "red"
                          }
                        />
                      </div>
                    </td>
                  
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
*/
