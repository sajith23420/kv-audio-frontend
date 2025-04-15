import { createClient } from "@supabase/supabase-js";

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcmdsZWd2bGlqYmdheWF2c2NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODYzMDksImV4cCI6MjA2MDA2MjMwOX0.UiihmezyFNsx8qeNJTttzAHrEoBuUeoPURJTH-3R5YA";
const supabase_url = "https://fdrglegvlijbgayavscl.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file selected");
            return;
        }

        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.name}`;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        }).then(({ error }) => {
            if (error) {
                reject("Error uploading file");
                return;
            }

            const publicUrl = `${supabase_url}/storage/v1/object/public/images/${fileName}`;
            resolve(publicUrl);
        }).catch(() => {
            reject("Error uploading file");
        });
    });
}