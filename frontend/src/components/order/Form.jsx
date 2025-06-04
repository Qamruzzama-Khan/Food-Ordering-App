import { useState } from "react";
import { createOrder } from "../../services/api/order";
import { useCartContext } from "../../hooks/useCart";
import { useAuthContext } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { cart, setCart } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    shippingInfo: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "",
    },
    paymentMethod: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // check if the change is in the shippingInfo object
    if (name in form.shippingInfo) {
      setForm({
        ...form,
        shippingInfo: {
          ...form.shippingInfo,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        setIsSubmitting(true);
        const response = await createOrder(cart._id, form, user?.accessToken);
        console.log(response.data.data);
        setIsSubmitting(false);
        setForm({
          shippingInfo: {
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phoneNumber: "",
          },
          paymentMethod: "",
        });
        navigate("/profile/placed-orders");
        setCart({});
      } catch (error) {
        setError(error.response.data.message);
        setIsSubmitting(false);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
      <h1 className="text-xl font-semibold text-gray-800">
        Shipping Information
      </h1>

      {Object.keys(form.shippingInfo).map((key) => (
        <div key={key} className="flex flex-col">
          <label
            htmlFor={key}
            className="text-sm text-gray-600 capitalize mb-1"
          >
            {key.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            id={key}
            name={key}
            type="text"
            value={form.shippingInfo[key]}
            onChange={handleChange}
            placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
            className="border border-gray-300 p-2 rounded focus:outline-none capitalize"
          />
        </div>
      ))}

      <div className="mt-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Payment Method
        </h2>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md cursor-pointer focus:outline-none"
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="online">Online</option>
          <option value="cod">Cash On Delivery</option>
        </select>
      </div>
      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-lg font-medium mt-2">{error}...</div>
      )}
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition mt-2 font-medium cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Confirming..." : "Confirm Order"}
      </button>
    </form>
  );
};

export default Form;
