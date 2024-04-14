import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeAction, getUserProfile } from "../actions/userActions";

export default function ModalSubscriber({ onClose, blogBody }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile);
  const { profileInfo } = userProfile;
  console.log("profileInfo", profileInfo);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardDetails = { cardNumber, expiryDate, cvv };
    dispatch(subscribeAction(cardDetails)).then(() => {
      dispatch(userLogin(userInfo.email, userInfo.password)); // Actualizamos los datos del usuario después de que se suscribe
      onClose();
    });
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Suscripción
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                className="mt-2 w-full"
                type="text"
                placeholder="Número de tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                className="mt-2 w-full"
                type="text"
                placeholder="Fecha de vencimiento"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <input
                className="mt-2 w-full"
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              <button
                className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Suscribirse
              </button>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
