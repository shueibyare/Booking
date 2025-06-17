import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null);
    const [seats, setSeats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const { busId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`http://localhost:8000/api/buses/${busId}`);
                setBus(response.data);
                setSeats(response.data.seats || []);
            } catch (err) {
                console.error('Error fetching bus details:', err);
                setError('Failed to load bus details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusDetails();
    }, [busId]);

    const handleBook = async (seatId) => {
        if (!token) {
            alert('Please login to book a seat');
            navigate('/login');
            return;
        }

        try {
            await axios.post(
                'http://localhost:8000/api/booking/',
                { seat: seatId },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            alert('Booking successful!');
            setSeats((prev) =>
                prev.map((seat) =>
                    seat.id === seatId ? { ...seat, is_booked: true } : seat
                )
            );
        } catch (err) {
            alert(err.response?.data?.error || 'Booking failed. Please login again.');
            navigate('/login');
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            {bus && (
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title">{bus.bus_name}</h3>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Journey Details</h5>
                                <ul className="list-unstyled">
                                    <li><strong>Route:</strong> {bus.origin} → {bus.destination}</li>
                                    <li><strong>Departure:</strong> {bus.start_time}</li>
                                    <li><strong>Arrival:</strong> {bus.reach_time}</li>
                                    <li><strong>Bus Number:</strong> {bus.number}</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <h5>Seat Legend</h5>
                                <div className="d-flex gap-3 flex-wrap">
                                    <Legend color="success" label="Available" />
                                    <Legend color="danger" label="Booked" />
                                    <Legend color="warning" label="Selected" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-4">Select Your Seat</h5>
                    <div className="row g-3">
                        {seats.map((seat) => (
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={seat.id}>
                                <button
                                    className={`btn w-100 ${
                                        seat.is_booked
                                            ? 'btn-outline-danger disabled'
                                            : selectedSeat === seat.id
                                                ? 'btn-warning'
                                                : 'btn-outline-success'
                                    }`}
                                    onClick={() => !seat.is_booked && handleBook(seat.id)}
                                >
                                    {seat.seat_number}
                                    {seat.is_booked && <div className="small text-danger">Booked</div>}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/my-bookings')}>
                    View Booking Details
                </button>
            </div>
        </div>
    );
};

const Legend = ({ color, label }) => (
    <div className="d-flex align-items-center">
        <div className={`rounded-circle bg-${color}`} style={{ width: 16, height: 16, marginRight: 8 }}></div>
        <span>{label}</span>
    </div>
);

export default BusSeats;
