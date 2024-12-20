"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApplyOnlineForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (formData) => {
    setSubmitting(true);

    // On récupère le fichier PDF
    const file = formData.resume && formData.resume[0];
    if (!file) {
      toast.error("Please upload your resume in PDF format.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
      return;
    }

    // Vérifier le type MIME côté client (optionnel mais recommandé)
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
      setSubmitting(false);
      return;
    }

    try {
      // Convertir le fichier en base64
      const base64String = await fileToBase64(file);

      // Ajouter le CV encodé en base64 à l'objet data
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        location: {
          reno: !!formData.location?.reno,
          seattle: !!formData.location?.seattle,
        },
        preferredShift: formData.preferredShift,
        details: formData.details,
        resumeBase64: base64String,
      };

      const response = await fetch("/.netlify/functions/submit-application", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success("Application submitted successfully, thank you!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        //reset form
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("address", "");
        setValue("location.reno", false);
        setValue("location.seattle", false);
        setValue("preferredShift", "");
        setValue("details", "");
        setValue("resume", null);
        window.scrollTo(0, 0);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => {
        // On récupère la string base64 complète au format data:application/pdf;base64,xxxxxxx
        // On va juste extraire la partie après la virgule
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const inputClasses =
    "py-3 px-4 block w-full border-2 border-gray-300 rounded-[5px] text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
  const checkboxClasses =
    "h-5 w-5 rounded border-2 border-gray-300 text-slate-700 focus:ring-blue-500";
  const radioClasses = "h-5 w-5 border-2 border-gray-300 text-slate-700 rounded-full focus:ring-blue-500";

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="max-w-2xl lg:max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="md:text-4xl text-3xl font-bold text-gray-900 mb-4">
            Apply Online
          </h1>
          <p className="md:text-xl text-lg text-gray-600">
            We're excited to learn more about you!
          </p>
        </div>

        <div className="bg-white shadow-md rounded-[5px] overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="md:text-2xl text-xl font-semibold text-gray-800 mb-6">
              Application Form
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className={inputClasses}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className={inputClasses}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={inputClasses}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className={inputClasses}
                  placeholder="(123) 456-7890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="address" className={labelClasses}>
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className={inputClasses}
                  placeholder="Enter your full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClasses}>Location Preference</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="reno"
                      {...register("location.reno")}
                      className={checkboxClasses}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Reno
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="seattle"
                      {...register("location.seattle")}
                      className={checkboxClasses}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Seattle
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Preferred Shift</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      {...register("preferredShift", { required: "Preferred shift is required" })}
                      value="Day (7:00am to 3:30pm)"
                      className={radioClasses}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Day (7:00am to 3:30pm)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      {...register("preferredShift")}
                      value="Swing (3:00pm to 11:30pm)"
                      className={radioClasses}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Swing (3:00pm to 11:30pm)
                    </span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      {...register("preferredShift")}
                      value="Graveyard (11:00pm to 7:00am)"
                      className={radioClasses}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Graveyard (11:00pm to 7:00am)
                    </span>
                  </label>
                </div>
                {errors.preferredShift && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.preferredShift.message}
                  </p>
                )}
              </div>

              {/* Nouveau champ pour le CV (PDF uniquement) */}
              <div>
                <label htmlFor="resume" className={labelClasses}>
                  Resume (PDF only)
                </label>
                <input
                  type="file"
                  id="resume"
                  accept="application/pdf"
                  {...register("resume", {
                    required: "Resume is required",
                  })}
                  className={inputClasses}
                />
                {errors.resume && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="details" className={labelClasses}>
                  Additional Details
                </label>
                <textarea
                  id="details"
                  {...register("details", {
                    required: "Details are required",
                  })}
                  rows="4"
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us more about yourself and why you're interested in this position..."
                ></textarea>
                {errors.details && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.details.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-[5px] border border-transparent bg-blue-500 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            We value your privacy. All information will be kept confidential.
          </p>
        </div>
      </div>
    </div>
  );
}
