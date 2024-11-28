import { useState, useRef } from 'react';
import { ChevronLeft, Plus, Mic } from 'lucide-react';
import { firestore } from '../firebase'; // Ensure correct Firestore import
import { collection, addDoc } from 'firebase/firestore';
import '../styles/ComplaintForm.css'; // Import the CSS file

const ComplaintForm = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFileToImgur(selectedFile); // Call the upload function when a file is selected
    }
  };

  const uploadFileToImgur = async (file) => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID YOUR_IMGUR_CLIENT_ID', // Replace with your Imgur Client ID
        },
        body: formData,
      });

      const data = await response.json();
      setUploading(false);

      if (data.success) {
        setImageURL(data.data.link);
        alert('Image uploaded successfully');
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      setUploading(false);
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleAudioRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioURL(URL.createObjectURL(audioBlob));
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error('Error accessing audio:', error);
        alert('Failed to access microphone. Please try again.');
      }
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description && !audioURL) {
      alert('Please provide a description or an audio recording.');
      return;
    }

    const complaintData = {
      description,
      imageUrl: imageURL,
      audioUrl: audioURL,
      timestamp: new Date(),
    };

    try {
      const complaintsCollection = collection(firestore, 'complaintForm');
      await addDoc(complaintsCollection, complaintData);
      alert('Complaint submitted successfully!');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit the complaint. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button">
          <ChevronLeft size={24} />
        </button>
        <div className="user-info">
          <div className="user-avatar" />
          <div>
            <h1 className="user-name">Favour Effiom</h1>
            <span className="user-role">★ Professional</span>
          </div>
        </div>
      </div>

      <div className="form-content">
        <h2 className="form-title">Discuss Emergency</h2>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-input"
          placeholder="Enter your emergency details..."
        />

        <label htmlFor="file-upload" className="upload-section">
          <div className="upload-icon">
            <Plus size={24} />
          </div>
          <span className="upload-text">Add a Photo/Video</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {file && <div className="file-preview"><p>{file.name}</p></div>}

        <div className="or-divider">Or</div>

        <button className="record-section" onClick={handleAudioRecord}>
          <div className="record-icon">
            <Mic size={24} />
          </div>
          <span className="record-text">{recording ? 'Stop Recording' : 'Record'}</span>
          <span className="record-hint">Press here to record</span>
        </button>

        {audioURL && (
          <div className="audio-preview">
            <audio controls src={audioURL}></audio>
          </div>
        )}

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={uploading || recording}
        >
          {uploading ? 'Uploading...' : 'Submit Complaint'}
        </button>
      </div>
    </div>
  );
};

export default ComplaintForm;
