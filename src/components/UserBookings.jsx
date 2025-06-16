import React, { useEffect, useState } from 'react';

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !userId) return;

    fetch(`http://localhost:8000/api/user/${userId}/bookings/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch bookings');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Bookings Data:', data);
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [token, userId]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="mt-4">
      <h2 className="h5 fw-semibold mb-3">Your Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="row gy-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Bus:</strong>{' '}
                    {booking.bus
                      ? `${booking.bus.bus_name} (${booking.bus.number})`
                      : 'N/A'}
                  </p>
                  <p className="mb-1"><strong>Origin:</strong> {booking.origin || 'N/A'}</p>
                  <p className="mb-1"><strong>Destination:</strong> {booking.destination || 'N/A'}</p>
                  <p className="mb-1"><strong>Price:</strong> ₹{booking.price || 'N/A'}</p>
                  <p className="mb-1"><strong>Seat Number:</strong> {booking.seat ? booking.seat.seat_number : 'N/A'}</p>
                  <p className="mb-2"><strong>Booked At:</strong> {new Date(booking.booking_time).toLocaleString()}</p>

                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: '#2563EB' }} // blue-600 equivalent
                    onClick={() => console.log(`Proceeding to payment for booking ${booking.id}`)}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
