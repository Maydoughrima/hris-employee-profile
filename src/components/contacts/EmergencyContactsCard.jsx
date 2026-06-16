"use client";

import React, { useState, useEffect } from "react";
//button
import Button from "@/components/ui/button/Button";

export default function EmergencyContactsCard() {
  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([
    {
      id: Date.now(),
      fullName: "",
      relationship: "",
      contactNumber: "",
    },
  ]);

  // function to add contact
  const addContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: "",
        relationship: "",
        contactNumber: "",
      },
    ]);
  };
  //handler for editing and validation
  const handleChange = (id, field, value) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, [field]: value } : contact,
    );

    setContacts(updatedContacts);

    const target = updatedContacts.find((c) => c.id === id);

    setErrors((prev) => ({
      ...prev,
      [id]: validateContact(target),
    }));
  };

  // function to remove contact field
  const removeContact = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?",
    );

    if (!confirmDelete) return;

    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  //saved data to view edited
  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) setContacts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  //validations
  const validateContact = (contact) => {
    const errors = {};

    // Full Name
    if (!contact.fullName?.trim()) {
      errors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(contact.fullName)) {
      errors.fullName =
        "Full name cannot contain numbers or special characters";
    }

    // Relationship
    if (!contact.relationship?.trim()) {
      errors.relationship = "Relationship is required";
    } else if (!/^[a-zA-Z\s]+$/.test(contact.relationship)) {
      errors.relationship =
        "Relationship cannot contain numbers or special characters";
    }

    // Contact Number
    if (!contact.contactNumber?.trim()) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^[0-9]+$/.test(contact.contactNumber)) {
      errors.contactNumber = "Numbers only allowed";
    } else if (contact.contactNumber.length < 11) {
      errors.contactNumber = "Must be at least 11 digits";
    }

    return errors;
  };

  return (
    <section className="border rounded-xl p-6 flex flex-col gap-6 bg-white shadow-sm">
      {/* header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="h4 text-center sm:text-left">Emergency Contacts</h2>

        <div className="flex justify-center sm:justify-end">
          <Button
            variant="primary"
            size="sm"
            className="lg:px-6 lg:py-3 text-sm"
            onClick={addContact}
          >
            Add Contact
          </Button>
        </div>
      </header>

      {/* empty row */}
      {contacts.length === 0 && (
        <div className="border border-dashed rounded-lg p-6 text-center text-muted text-sm">
          No emergency contacts yet. Click “Add Contact” to create one.
        </div>
      )}

      {/* contact list */}
      <div className="flex flex-col gap-4">
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="border rounded-lg p-4 md:p-5 bg-white hover:shadow-sm transition"
          >
            {/* grid container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* fullname */}
              <div>
                <label className="text-xs text-secondary">Full Name</label>
                <input
                  value={contact.fullName}
                  onChange={(e) =>
                    handleChange(contact.id, "fullName", e.target.value)
                  }
                  placeholder="Juan Dela Cruz"
                  className={`w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black ${
                    errors[contact.id]?.fullName ? "border-red-400" : ""
                  }`}
                />
                {errors[contact.id]?.fullName && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors[contact.id].fullName}
                  </p>
                )}
              </div>

              {/* relationship */}
              <div>
                <label className="text-xs text-secondary">Relationship</label>
                <input
                  value={contact.relationship}
                  onChange={(e) =>
                    handleChange(contact.id, "relationship", e.target.value)
                  }
                  placeholder="Father / Mother"
                  className={`w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black ${
                    errors[contact.id]?.relationship ? "border-red-400" : ""
                  }`}
                />
                {errors[contact.id]?.relationship && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors[contact.id].relationship}
                  </p>
                )}
              </div>

              {/* contact number */}
              <div>
                <label className="text-xs text-secondary">Contact Number</label>
                <input
                  value={contact.contactNumber}
                  onChange={(e) =>
                    handleChange(contact.id, "contactNumber", e.target.value)
                  }
                  placeholder="09xxxxxxxxx"
                  className={`w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black ${
                    errors[contact.id]?.contactNumber ? "border-red-400" : ""
                  }`}
                />
                {errors[contact.id]?.contactNumber && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors[contact.id].contactNumber}
                  </p>
                )}
              </div>
            </div>

            {/* cta */}
            <div className="flex justify-end mt-4">
              <Button
                variant="danger"
                size="sm"
                className="px-6"
                disabled = {contacts.length <= 1}
                onClick={() => removeContact(contact.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
