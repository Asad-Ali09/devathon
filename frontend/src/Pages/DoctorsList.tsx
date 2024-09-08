import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getDoctors } from "../Api/UserCalls";
import { AppDispatch, RootState } from "../Redux/store";
import { Doctor } from "../Types";

export function DoctorList() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    doctors = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(doctors)) {
      setFilteredDoctors(
        doctors.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialization
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredDoctors([]); // Clear filtered doctors if doctors is not an array
    }
  }, [searchQuery, doctors]);

  const handleSearch = () => {
    if (Array.isArray(doctors)) {
      setFilteredDoctors(
        doctors.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialization
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <Typography
        variant="h4"
        color="blue-gray"
        className="mb-4 font-bold text-center"
      >
        Available Doctors
      </Typography>
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          labelProps={{ className: "hidden" }}
          placeholder="Search by name or specialization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
        />
        <Button onClick={handleSearch} color="black">
          Search
        </Button>
      </div>
      <Card className="w-full mx-auto bg-white shadow-md rounded-lg p-4 border-t-2 !min-w-[50vh]">
        <List>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <ListItem
                key={index}
                className="border-b border-gray-200 h-20 flex items-center"
              >
                <div className="w-10 flex items-center justify-center font-medium text-gray-600">
                  {index + 1}
                </div>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt={doctor.name}
                    src={doctor.imageUrl || "h  ttps://via.placeholder.com/150"}
                    className="w-16 h-16"
                  />
                </ListItemPrefix>
                <div className="ml-4 flex-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {doctor.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal mb-1"
                  >
                    {doctor.specialization}
                  </Typography>
                  <Link
                    to={`/doctor/${index}`}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </ListItem>
            ))
          ) : (
            <Typography variant="small" color="gray" className="text-center">
              No doctors found.
            </Typography>
          )}
        </List>
      </Card>
    </div>
  );
}
