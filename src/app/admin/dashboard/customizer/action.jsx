import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Action() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [Loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        stuffType: "",
        color: "",
        colorCode: "",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (result) => {
        setFormData((prevData) => ({
            ...prevData,
            imageUrl: result.info.secure_url, // Assuming Cloudinary returns the secure URL
        }));
    };

    const handleSubmit = async () => {
        // Handle form submission logic here, like sending the data to your backend
        setLoading(true);
        try {

            const response = await fetch("/api/handleVariation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData }),
            })

            if (!response.ok) {
                toast.error("Error in upload")
                setLoading(false)
            }

            setLoading(false)
            setFormData({
                title: "",
                imageUrl: "",
                stuffType: "",
                color: "",
                colorCode: "",
                price: "",
            })
            onClose(); // Close the modal after submission

        } catch (error) {
            toast.error("Error in Submission")
            console.log(error)
            setLoading(false)
        }

    };

    return (
        <>
            <Button size="md" color="default" onPress={onOpen}>Upload Variation</Button>
            <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Upload Variation</ModalHeader>
                    <ModalBody>
                        <div className="space-y-2">
                            <Input
                                label="Title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Stuff Type"
                                type="text"
                                name="stuffType"
                                value={formData.stuffType}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Color"
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Color Code (Hex)"
                                type="text"
                                name="colorCode"
                                value={formData.colorCode}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Price"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />

                            <CldUploadWidget
                                uploadPreset="ml_default"
                                options={{ sources: ["local", "url"] }}
                                onSuccess={handleImageUpload}
                            >
                                {({ open }) => (
                                    <button
                                        className="text-white font-semibold text-sm rounded-lg px-4 py-2 bg-blue-500"
                                        onClick={() => open()}
                                    >
                                        Add Image
                                    </button>
                                )}
                            </CldUploadWidget>

                            {formData.imageUrl && (
                                <div className="mt-2">
                                    <img src={formData.imageUrl} alt="Uploaded Variation" className="w-32 h-32 object-cover" />
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button isLoading={Loading} color="primary" onPress={handleSubmit}>
                            Upload Variation
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
