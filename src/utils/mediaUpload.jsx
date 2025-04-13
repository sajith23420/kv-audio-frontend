import { createClient } from "@supabase/supabase-js";

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcmdsZWd2bGlqYmdheWF2c2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODYzMDksImV4cCI6MjA2MDA2MjMwOX0.UiihmezyFNsx8qeNJTttzAHrEoBuUeoPURJTH-3R5YA";
const supabase_url = "https://fdrglegvlijbgayavscl.supabase.co"

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {

    if(file == null ){
        reject("no file selected")
    }

    return new Promise((resolve, reject) => {

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(file.name).data.publicUrl;
            console.log(publicUrl);
            resolve(publicUrl);

        }).catch(()=>{
            reject("Error uploading file")
        })

    });

    
    

}
