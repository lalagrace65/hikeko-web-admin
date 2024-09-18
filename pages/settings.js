import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';

const SystemSettingsForm = () => {
    const [systemName, setSystemName] = useState('');
    const [systemImage, setSystemImage] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        axios.get('/api/system-settings')
            .then(response => {
                setSystemName(response.data.systemName);
                setPreview(response.data.systemImage);
            })
            .catch(error => {
                console.error('Error fetching system settings', error);
            });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSystemImage(reader.result);
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/system-settings', { systemName, systemImage })
            .then(response => {
                alert('System settings updated successfully!');
            })
            .catch(error => {
                console.error('Error updating system settings', error);
            });
    };

    return (
    <Layout>
        <form onSubmit={handleSubmit}>
            <div>
                <label>System Name:</label>
                <input 
                    type="text" 
                    value={systemName} 
                    onChange={(e) => setSystemName(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>System Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && <img src={preview} alt="System Preview" style={{ width: '200px', height: '200px' }} />}
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </Layout>
    );
};

export default SystemSettingsForm;
