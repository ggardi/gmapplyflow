import React from "react";
import { useForm } from "@inertiajs/react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import RadioGroup from "../components/RadioGroup";
import Select from "../components/Select";
import SearchableSelect from "../components/SearchableSelect";
import FormRow from "../components/FormRow";
import FloatingLabelInput from "../components/FloatingLabelInput";

console.log("Apply Form is loading...");

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

const FORM_STORAGE_KEY = "applyOnline_formData";
const FORM_TIMESTAMP_KEY = "applyOnline_formTimestamp";

const saveFormData = (data) => {
    try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(FORM_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.warn("Could not save form data to localStorage:", error);
    }
};

const loadFormData = () => {
    try {
        const savedData = localStorage.getItem(FORM_STORAGE_KEY);
        const timestamp = localStorage.getItem(FORM_TIMESTAMP_KEY);

        if (savedData && timestamp) {
            const data = JSON.parse(savedData);
            const savedTime = parseInt(timestamp);
            const currentTime = Date.now();
            // 24 hours
            const dayInMs = 24 * 60 * 60 * 1000;

            if (currentTime - savedTime < dayInMs) {
                return { data, timestamp: savedTime };
            } else {
                clearFormData();
            }
        }
    } catch (error) {
        console.warn("Could not load form data from localStorage:", error);
    }
    return null;
};

const clearFormData = () => {
    try {
        localStorage.removeItem(FORM_STORAGE_KEY);
        localStorage.removeItem(FORM_TIMESTAMP_KEY);
    } catch (error) {
        console.warn("Could not clear form data from localStorage:", error);
    }
};

export default function ApplyForm({ flash }) {
    // Check for saved form data on component mount
    const savedFormData = loadFormData();
    const initialFormData = {
        first_name: "",
        last_name: "",
        email: "",
        loan_type: "",
        state: "",
        loan_officer: null,
        password: "",
        password_confirmation: "",
    };

    const { data, setData, post, processing, errors } =
        useForm(initialFormData);

    const [localErrors, setLocalErrors] = React.useState({});
    const [touchedFields, setTouchedFields] = React.useState({});
    const [loanOfficerResults, setLoanOfficerResults] = React.useState([]);
    const [emailExists, setEmailExists] = React.useState(false);
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [checkingEmail, setCheckingEmail] = React.useState(false);
    const [lastCheckedEmail, setLastCheckedEmail] = React.useState("");

    const [showRestorePrompt, setShowRestorePrompt] = React.useState(false);
    const [savedDataToRestore, setSavedDataToRestore] = React.useState(null);

    React.useEffect(() => {
        if (savedFormData && savedFormData.data) {
            const hasContent = Object.values(savedFormData.data).some(
                (value) => value && value !== "" && value !== null
            );

            if (hasContent) {
                setSavedDataToRestore(savedFormData);
                setShowRestorePrompt(true);
            }
        }
    }, []);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            const hasContent = Object.values(data).some(
                (value) => value && value !== "" && value !== null
            );

            if (hasContent && !processing) {
                saveFormData(data);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [data, processing]);

    const handleRestoreSavedData = () => {
        if (savedDataToRestore && savedDataToRestore.data) {
            Object.keys(savedDataToRestore.data).forEach((key) => {
                setData(key, savedDataToRestore.data[key]);
            });

            if (
                savedDataToRestore.data.state &&
                savedDataToRestore.data.loan_officer
            ) {
                const filteredOfficers = mockLoanOfficers.filter(
                    (officer) => officer.state === savedDataToRestore.data.state
                );
                setLoanOfficerResults(filteredOfficers);
            }
        }

        setShowRestorePrompt(false);
        setSavedDataToRestore(null);
    };

    const handleStartFresh = () => {
        clearFormData();
        setShowRestorePrompt(false);
        setSavedDataToRestore(null);

        Object.keys(initialFormData).forEach((key) => {
            setData(key, initialFormData[key]);
        });

        setLocalErrors({});
        setTouchedFields({});
        setLoanOfficerResults([]);
        setEmailExists(false);
        setEmailChecked(false);
        setLastCheckedEmail("");
    };

    const formatSavedDataTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            return `${diffInMinutes} minute${
                diffInMinutes !== 1 ? "s" : ""
            } ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const loanTypeOptions = [
        { value: "purchase", label: "Purchase" },
        { value: "refinance", label: "Refinance" },
    ];

    const stateOptions = [
        { value: "CA", label: "California" },
        { value: "NY", label: "New York" },
        { value: "TX", label: "Texas" },
    ];

    const mockLoanOfficers = [
        {
            id: 1,
            name: "Robert Downey Jr",
            branch: "Downtown Branch",
            state: "CA",
        },
        {
            id: 2,
            name: "Vladimir Putin",
            branch: "Westside Branch",
            state: "CA",
        },
        { id: 3, name: "Tom Hanks", branch: "North Branch", state: "CA" },
        {
            id: 4,
            name: "Matthew McConaughey",
            branch: "Main Street Branch",
            state: "TX",
        },
        {
            id: 5,
            name: "Jennifer Lopez",
            branch: "Central Branch",
            state: "TX",
        },
        { id: 6, name: "Pete Davidson", branch: "South Branch", state: "TX" },
        {
            id: 7,
            name: "Jimmie Walker",
            branch: "East Side Branch",
            state: "NY",
        },
        { id: 8, name: "Elton John", branch: "Broadway Branch", state: "NY" },
        {
            id: 9,
            name: "John Doe",
            branch: "Financial District Branch",
            state: "NY",
        },
    ];

    const handleLoanOfficerSearch = (searchTerm) => {
        if (!data.state || !searchTerm.trim()) {
            setLoanOfficerResults([]);
            return;
        }

        const filtered = mockLoanOfficers.filter(
            (officer) =>
                officer.state === data.state &&
                (officer.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    officer.branch
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        );

        setLoanOfficerResults(filtered);
    };

    const checkEmailExists = async (email) => {
        if (!EMAIL_REGEX.test(email)) {
            return false;
        }

        setCheckingEmail(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const existingEmails = [
            "test@example.com",
            "john@doe.com",
            "admin@test.com",
        ];
        const exists =
            existingEmails.includes(email.toLowerCase()) || Math.random() > 0.7;

        setEmailExists(exists);
        setEmailChecked(true);
        setCheckingEmail(false);
        setLastCheckedEmail(email.toLowerCase());

        return exists;
    };

    const handleEmailBlur = async (email) => {
        setTouchedFields((prev) => ({ ...prev, email: true }));
        const isValid = validateField("email", email);

        if (isValid && email.trim()) {
            if (email.toLowerCase() !== lastCheckedEmail) {
                await checkEmailExists(email);
            }
        } else {
            setEmailExists(false);
            setEmailChecked(false);
            setLastCheckedEmail("");
        }
    };

    const handleEmailChange = (email) => {
        setData("email", email);

        if (email.toLowerCase() !== lastCheckedEmail) {
            setEmailExists(false);
            setEmailChecked(false);
        }

        if (touchedFields.email) {
            validateField("email", email);
        }
    };

    const validateField = (fieldName, value) => {
        const newErrors = { ...localErrors };

        switch (fieldName) {
            case "first_name":
                if (!value.trim()) {
                    newErrors.first_name = "First name is required";
                } else if (value.trim().length < 3) {
                    newErrors.first_name =
                        "First name must be at least 3 characters";
                } else {
                    delete newErrors.first_name;
                }
                break;

            case "last_name":
                if (!value.trim()) {
                    newErrors.last_name = "Last name is required";
                } else if (value.trim().length < 3) {
                    newErrors.last_name =
                        "Last name must be at least 3 characters";
                } else {
                    delete newErrors.last_name;
                }
                break;

            case "email":
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (!EMAIL_REGEX.test(value)) {
                    newErrors.email = "Please enter a valid email address";
                } else {
                    delete newErrors.email;
                }
                break;

            case "loan_type":
                if (!value) {
                    newErrors.loan_type = "Loan type is required";
                } else {
                    delete newErrors.loan_type;
                }
                break;

            case "state":
                if (!value) {
                    newErrors.state = "State is required";
                } else {
                    delete newErrors.state;
                }
                break;

            case "loan_officer":
                if (!value) {
                    newErrors.loan_officer = "Loan officer is required";
                } else {
                    delete newErrors.loan_officer;
                }
                break;

            case "password":
                if (!value.trim()) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password =
                        "Password must be at least 8 characters";
                } else {
                    delete newErrors.password;
                }
                break;

            case "password_confirmation":
                if (!value.trim()) {
                    newErrors.password_confirmation =
                        "Password confirmation is required";
                } else if (value !== data.password) {
                    newErrors.password_confirmation = "Passwords do not match";
                } else {
                    delete newErrors.password_confirmation;
                }
                break;
        }

        setLocalErrors(newErrors);
        return !newErrors[fieldName];
    };

    const handleFieldBlur = (fieldName, value) => {
        setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
        validateField(fieldName, value);
    };

    const handleFieldChange = (fieldName, value) => {
        setData(fieldName, value);

        if (touchedFields[fieldName]) {
            validateField(fieldName, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTouchedFields({
            first_name: true,
            last_name: true,
            email: true,
            loan_type: true,
            state: true,
            loan_officer: true,
            password: true,
            password_confirmation: true,
        });

        const isFirstNameValid = validateField("first_name", data.first_name);
        const isLastNameValid = validateField("last_name", data.last_name);
        const isEmailValid = validateField("email", data.email);
        const isLoanTypeValid = validateField("loan_type", data.loan_type);
        const isStateValid = validateField("state", data.state);
        const isLoanOfficerValid = validateField(
            "loan_officer",
            data.loan_officer
        );
        const isPasswordValid = validateField("password", data.password);
        const isPasswordConfirmationValid = validateField(
            "password_confirmation",
            data.password_confirmation
        );

        if (
            !isFirstNameValid ||
            !isLastNameValid ||
            !isEmailValid ||
            !isLoanTypeValid ||
            !isStateValid ||
            !isLoanOfficerValid ||
            !isPasswordValid ||
            !isPasswordConfirmationValid
        ) {
            return;
        }

        if (emailExists) {
            return;
        }

        clearFormData();

        post("/submit-application");
    };

    const isFormValid = () => {
        const isFirstNameValid = data.first_name.trim().length >= 3;
        const isLastNameValid = data.last_name.trim().length >= 3;
        const isEmailValid = data.email.trim() && EMAIL_REGEX.test(data.email);
        const isLoanTypeValid = !!data.loan_type;
        const isStateValid = !!data.state;
        const isLoanOfficerValid = !!data.loan_officer;
        const isPasswordValid = data.password.length >= 8;
        const isPasswordConfirmationValid =
            data.password_confirmation &&
            data.password_confirmation === data.password;

        const isEmailAvailable = emailChecked && !emailExists;

        return (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isLoanTypeValid &&
            isStateValid &&
            isLoanOfficerValid &&
            isPasswordValid &&
            isPasswordConfirmationValid &&
            isEmailAvailable
        );
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Apply Online</h1>

            {showRestorePrompt && savedDataToRestore && (
                <div
                    className="alert alert-info"
                    style={{ marginBottom: "var(--space-6)" }}
                >
                    <div style={{ marginBottom: "var(--space-3)" }}>
                        <strong>
                            📋 We found your previous application data!
                        </strong>
                    </div>
                    <div
                        style={{
                            marginBottom: "var(--space-4)",
                            fontSize: "var(--font-size-sm)",
                        }}
                    >
                        Last saved:{" "}
                        {formatSavedDataTime(savedDataToRestore.timestamp)}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "var(--space-3)",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleRestoreSavedData}
                            style={{
                                padding: "var(--space-2) var(--space-4)",
                                fontSize: "var(--font-size-sm)",
                                minHeight: "auto",
                            }}
                        >
                            Continue where I left off
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={handleStartFresh}
                            style={{
                                padding: "var(--space-2) var(--space-4)",
                                fontSize: "var(--font-size-sm)",
                                backgroundColor: "var(--color-gray-200)",
                                color: "var(--color-gray-700)",
                                minHeight: "auto",
                            }}
                        >
                            Start fresh
                        </button>
                    </div>
                </div>
            )}

            {flash && flash.success && (
                <Alert type="success">{flash.success}</Alert>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate>
                <FormRow>
                    <FloatingLabelInput
                        label="First Name"
                        type="text"
                        value={data.first_name}
                        onChange={(e) =>
                            handleFieldChange("first_name", e.target.value)
                        }
                        onBlur={(e) =>
                            handleFieldBlur("first_name", e.target.value)
                        }
                        error={localErrors.first_name || errors.first_name}
                    />
                    <FloatingLabelInput
                        label="Last Name"
                        type="text"
                        value={data.last_name}
                        onChange={(e) =>
                            handleFieldChange("last_name", e.target.value)
                        }
                        onBlur={(e) =>
                            handleFieldBlur("last_name", e.target.value)
                        }
                        error={localErrors.last_name || errors.last_name}
                    />
                </FormRow>

                <FloatingLabelInput
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={(e) => handleEmailBlur(e.target.value)}
                    error={localErrors.email || errors.email}
                />

                {checkingEmail && (
                    <div className="status-message status-loading">
                        Checking email availability...
                    </div>
                )}

                {emailExists && emailChecked && (
                    <div className="alert alert-warning">
                        <strong>Email already exists!</strong>
                        <br />
                        This email is already registered.
                        <a href="/login" className="link">
                            Click here to login
                        </a>{" "}
                        or use a different email address to continue.
                    </div>
                )}

                {!emailExists &&
                    emailChecked &&
                    EMAIL_REGEX.test(data.email) && (
                        <div className="status-message status-success">
                            ✓ Email is available
                        </div>
                    )}

                <RadioGroup
                    label="Loan Type"
                    name="loan_type"
                    options={loanTypeOptions}
                    value={data.loan_type}
                    onChange={(value) => {
                        setData("loan_type", value);
                        if (touchedFields.loan_type) {
                            validateField("loan_type", value);
                        }
                    }}
                    onBlur={(value) => handleFieldBlur("loan_type", value)}
                    error={localErrors.loan_type || errors.loan_type}
                />

                <Select
                    label="State"
                    options={stateOptions}
                    value={data.state}
                    onChange={(value) => {
                        setData("state", value);
                        setData("loan_officer", null);
                        setLoanOfficerResults([]);
                        if (touchedFields.state) {
                            validateField("state", value);
                        }
                        if (touchedFields.loan_officer) {
                            validateField("loan_officer", null);
                        }
                    }}
                    onBlur={(value) => handleFieldBlur("state", value)}
                    placeholder="Select a state..."
                    error={localErrors.state || errors.state}
                />

                <SearchableSelect
                    label="Loan Officer"
                    value={data.loan_officer}
                    onChange={(officer) => {
                        setData("loan_officer", officer);
                        if (touchedFields.loan_officer) {
                            validateField("loan_officer", officer);
                        }
                    }}
                    onSearch={handleLoanOfficerSearch}
                    searchResults={loanOfficerResults}
                    placeholder={
                        data.state
                            ? "Search loan officers or branches..."
                            : "Please select a state first"
                    }
                    error={localErrors.loan_officer || errors.loan_officer}
                />

                <FormInput
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                    }
                    onBlur={(e) => handleFieldBlur("password", e.target.value)}
                    error={localErrors.password || errors.password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        handleFieldChange(
                            "password_confirmation",
                            e.target.value
                        )
                    }
                    onBlur={(e) =>
                        handleFieldBlur("password_confirmation", e.target.value)
                    }
                    error={
                        localErrors.password_confirmation ||
                        errors.password_confirmation
                    }
                />

                <Button
                    type="submit"
                    disabled={processing || !isFormValid()}
                    variant="primary"
                >
                    {processing ? "Submitting..." : "Submit Application"}
                </Button>
            </form>
        </div>
    );
}
