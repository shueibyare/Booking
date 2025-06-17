import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BusList = ({ token }) => {
    const [buses, setBuses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterOrigin, setFilterOrigin] = useState('')
    const [filterDestination, setFilterDestination] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/buses/")
                setBuses(response.data)
            } catch (error) {
                console.error('Error fetching buses', error)
                setError('Failed to load buses. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchBuses()
    }, [])

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`)
    }

    const filteredBuses = buses.filter(bus => {
        const matchesSearch = bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bus.number.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesOrigin = filterOrigin ? bus.origin.toLowerCase() === filterOrigin.toLowerCase() : true
        const matchesDestination = filterDestination ? bus.destination.toLowerCase() === filterDestination.toLowerCase() : true
        return matchesSearch && matchesOrigin && matchesDestination
    })

    const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))]
    const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))]

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container my-4">
                <div className="alert alert-danger" role="alert">
                    <strong>Error!</strong> {error}
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Available Buses</h1>

            {/* Filters */}
            <div className="card p-4 mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label">Search</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search buses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">From</label>
                        <select
                            className="form-select"
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                        >
                            <option value="">All Origins</option>
                            {uniqueOrigins.map(origin => (
                                <option key={origin} value={origin}>{origin}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">To</label>
                        <select
                            className="form-select"
                            value={filterDestination}
                            onChange={(e) => setFilterDestination(e.target.value)}
                        >
                            <option value="">All Destinations</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setSearchTerm('')
                                setFilterOrigin('')
                                setFilterDestination('')
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {filteredBuses.length === 0 ? (
                <div className="text-center py-5">
                    <h4>No buses found</h4>
                    <p className="text-muted">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filteredBuses.map((bus) => (
                        <div key={bus.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5 className="card-title">{bus.bus_name}</h5>
                                            <p className="card-text text-muted">Bus No: {bus.number}</p>
                                        </div>
                                        <span className="badge bg-primary">Available</span>
                                    </div>

                                    <p className="mt-3"><i className="bi bi-geo-alt-fill me-2"></i>{bus.origin} → {bus.destination}</p>
                                    <p><i className="bi bi-clock-fill me-2"></i>Depart: {bus.start_time}</p>
                                    <p><i className="bi bi-clock me-2"></i>Arrive: {bus.reach_time}</p>
                                </div>
                                <div className="card-footer bg-transparent border-0">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => handleViewSeats(bus.id)}
                                    >
                                        View Seats & Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusList
