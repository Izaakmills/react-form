import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  phoneNumber: number;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  state: string;
  zipCode: number;
};

export default function Form() {
  const [saved, setSaved] = React.useState(false);
  const [searchAlert, setSearchAlert] = React.useState<string>();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm<Inputs>({ mode: "onBlur", criteriaMode: "firstError" });

  const onSubmit: SubmitHandler<Inputs> = () => setSaved(true);

  const handleSetZipCodeSelection = (data: any) => {
    setValue("city", data[0].zipcodes[0].default_city);
    setValue("state", data[0].zipcodes[0].state);
    setValue("zipCode", data[0].zipcodes[0].zipcode);
    trigger(["city", "state", "zipCode"]);
  };

  const handleZipCodeSearch = () => {
    setSearchAlert(undefined);
    fetch(
      `https://us-zipcode.api.smartystreets.com/lookup?auth-id=da12009c-ca38-4ce5-4181-6ad23cd424da&auth-token=aXhIZixNcegDKQdX55D8&zipcode=${getValues(
        "zipCode"
      )}}`
    )
      .then((response) => response.json())
      .then((data) => handleSetZipCodeSelection(data))
      .catch((error) => setSearchAlert("Zip code not found"));
  };

  return (
    <div className="card m-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5 className="card-header">{saved ? "Saved" : "Form example"}</h5>
        {!saved && (
          <div className="card-body">
            <div className="form-group mb-2">
              <label htmlFor="firstName">First Name</label>
              <input
                className="form-control"
                placeholder="Enter first name"
                type={"text"}
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <small id="firstNameError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="middleName">Middle Name</label>
              <input
                className="form-control"
                type={"text"}
                {...register("middleName")}
                placeholder="Enter middle name"
              />
              {errors.middleName && (
                <small id="lastNameError" className="text-danger">
                  Error
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="form-control"
                type={"text"}
                {...register("lastName", { required: true })}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <small id="lastNameError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="dob">Date of birth</label>
              <input
                className="form-control"
                type={"date"}
                {...register("dob", { required: true, valueAsDate: true })}
                placeholder="Enter D.O.B"
              />
              {errors.dob && (
                <small id="dobError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                className="form-control"
                type={"tel"}
                {...register("phoneNumber", { required: true })}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <small id="phoneNumberError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="streetAddress1">Street Address 1</label>
              <input
                className="form-control"
                type={"text"}
                {...register("streetAddress1", { required: true })}
                placeholder="12 Main St..."
              />
              {errors.streetAddress1 && (
                <small id="streetAddress1Error" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="streetAddress2">Street Address 2</label>
              <input
                className="form-control"
                type={"text"}
                {...register("streetAddress2")}
                placeholder=""
              />
              {errors.streetAddress2 && (
                <small id="streetAddress2Error" className="text-danger">
                  Error
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="city">City</label>
              <input
                className="form-control"
                type={"text"}
                {...register("city", { required: true })}
                placeholder="City"
              />
              {errors.city && (
                <small id="cityError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="state">State</label>
              <input
                className="form-control"
                type={"text"}
                {...register("state", { required: true })}
                placeholder="State"
              />
              {errors.state && (
                <small id="stateError" className="text-danger">
                  Required
                </small>
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="zipCode">Zip code</label>
              <div className={"row"}>
                <div className={"col-sm-8"}>
                  <input
                    className="form-control"
                    type={"text"}
                    {...register("zipCode", {
                      required: true,
                      pattern: /^\d{5}(?:[-\s]\d{4})?$/,
                    })}
                  />
                </div>

                <div className={"col-sm-2"}>
                  <button
                    className={"btn btn-primary"}
                    type="button"
                    onClick={() => handleZipCodeSearch()}
                  >
                    {" "}
                    AutoFill
                  </button>
                  {searchAlert && <small>{searchAlert}</small>}
                </div>
              </div>

              {errors.zipCode && (
                <small id="zipCodeError" className="text-danger">
                  Required
                </small>
              )}
            </div>

            <div className={"row"}>
              <button className={"btn btn-primary btn-block"} type="submit">
                {" "}
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
