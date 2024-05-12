export async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>, setImageUrl: (url: string | null) => void, setImageFile: (file: File | null) => void){
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        setImageFile(selectedFile)
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setImageUrl(dataUrl);
        };
        reader.readAsDataURL(selectedFile); 
    }
}