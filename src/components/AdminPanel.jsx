"use client";

import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/db';
import { darkTheme, lightTheme } from '../lib/theme';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  Image,
  FolderOpen,
  LogOut,
  Mail,
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  CheckCircle,
  FileText,
  RotateCcw,
  Upload,
  ChevronRight,
  ZoomIn,
  Move,
  Sun,
  Moon,
  Menu,
  X as XIcon,
  Sliders,
  Link as LinkIcon,
  HelpCircle,
  Sparkles,
  Share2,
  AlertCircle,
  CheckCircle2,
  Layers,
  ExternalLink,
  Copy,
  Tag,
  RefreshCw
} from 'lucide-react';

// ==========================================
// 1. IMAGE CLOUDINARY UPLOADER & CROPPER
// ==========================================
export async function uploadImageToCloudinary(imageSource, folder = 'travinno') {
  if (!imageSource) return '';
  if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
    return imageSource;
  }
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageSource, folder }),
    });
    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    }
  } catch (err) {
    console.error('Failed to upload image to Cloudinary:', err);
  }
  return imageSource;
}

function ImageCropper({ onImageCropped, currentImage, title = "Upload Image", aspectRatio, outputType = "jpeg" }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // 'uploading' | 'success' | 'fallback'
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Set default dimensions (8:5 aspect ratio)
  let containerWidth = 400;
  let containerHeight = 250;
  let outputWidth = 1600;
  let outputHeight = 1000;

  if (aspectRatio === '16:9') {
    containerWidth = 400;
    containerHeight = 225;
    outputWidth = 1920;
    outputHeight = 1080;
  } else if (aspectRatio === '9:16') {
    containerWidth = 225;
    containerHeight = 400;
    outputWidth = 1080;
    outputHeight = 1920;
  } else if (aspectRatio === '4:5') {
    containerWidth = 320;
    containerHeight = 400;
    outputWidth = 1080;
    outputHeight = 1350;
  }

  // Load existing image if any
  useEffect(() => {
    if (currentImage) {
      setImageSrc(currentImage);
      setZoom(1);
      setPosX(0);
      setPosY(0);
      if (currentImage.startsWith('https://res.cloudinary.com')) {
        setUploadStatus('success');
      }
    } else {
      setImageSrc(null);
      setUploadStatus('');
    }
  }, [currentImage]);

  const processAndUploadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result;
      setImageSrc(rawDataUrl);
      setZoom(1);
      setPosX(0);
      setPosY(0);
      // Automatically crop and upload to Cloudinary immediately
      cropAndUpload(rawDataUrl, 1, 0, 0);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) processAndUploadFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) processAndUploadFile(file);
  };

  const cropAndUpload = (srcToUse = null, customZoom = zoom, customX = posX, customY = posY) => {
    const activeSrc = srcToUse || imageSrc;
    if (!activeSrc) return;
    
    setIsUploading(true);
    setUploadStatus('uploading');

    const img = new window.Image();
    const resolvedSrc = activeSrc.startsWith('data:') || activeSrc.startsWith('http') 
      ? activeSrc 
      : (activeSrc.startsWith('/') ? activeSrc : `/${activeSrc}`);
    img.crossOrigin = "anonymous";
    img.src = resolvedSrc;
    img.onload = async () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setIsUploading(false);
        return;
      }
      const ctx = canvas.getContext('2d');
      
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      
      if (outputType !== 'png') {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, outputWidth, outputHeight);
      } else {
        ctx.clearRect(0, 0, outputWidth, outputHeight);
      }
      
      const imgRatio = img.width / img.height;
      const targetRatio = containerWidth / containerHeight;
      
      let drawWidth, drawHeight;
      if (imgRatio > targetRatio) {
        drawHeight = containerHeight;
        drawWidth = containerHeight * imgRatio;
      } else {
        drawWidth = containerWidth;
        drawHeight = containerWidth / imgRatio;
      }
      
      // Base centered coordinates
      const startX = (containerWidth - drawWidth) / 2;
      const startY = (containerHeight - drawHeight) / 2;
      
      // Scale coordinates from container space up to output canvas space
      const scaleMultiplier = outputWidth / containerWidth;
      
      const scaledWidth = drawWidth * customZoom * scaleMultiplier;
      const scaledHeight = drawHeight * customZoom * scaleMultiplier;
      
      // Calculate scaled draw positions with translation offsets
      const dx = (startX + customX + (drawWidth * (1 - customZoom)) / 2) * scaleMultiplier;
      const dy = (startY + customY + (drawHeight * (1 - customZoom)) / 2) * scaleMultiplier;
      
      ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);
      
      // Get base64 string compressed in webp format
      const base64Image = canvas.toDataURL('image/webp', 0.85);

      // Upload to Cloudinary via Next.js /api/upload
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image, folder: 'travinno' }),
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.url) {
          onImageCropped(uploadData.url);
          setImageSrc(uploadData.url);
          setUploadStatus('success');
        } else {
          // Fallback to compressed base64 if Cloudinary is temporarily unreachable
          onImageCropped(base64Image);
          setUploadStatus('fallback');
        }
      } catch (uploadErr) {
        onImageCropped(base64Image);
        setUploadStatus('fallback');
      } finally {
        setIsUploading(false);
      }
    };
    img.onerror = () => {
      setIsUploading(false);
      setUploadStatus('');
    };
  };

  const removeImage = () => {
    setImageSrc(null);
    setUploadStatus('');
    onImageCropped('');
  };

  const isCloudinaryUrl = imageSrc && (imageSrc.startsWith('https://res.cloudinary.com') || uploadStatus === 'success');

  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F5F2EC', letterSpacing: '0.5px' }}>{title}</span>
        {isUploading && (
          <span style={{ fontSize: '0.72rem', color: '#E0A96D', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Uploading to Cloudinary CDN...
          </span>
        )}
        {!isUploading && isCloudinaryUrl && (
          <span style={{ fontSize: '0.72rem', color: '#4EBA6F', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <CheckCircle size={13} /> Cloudinary Synced
          </span>
        )}
      </div>
      
      {/* Upload Box / Cropper Frame */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !imageSrc && fileInputRef.current && fileInputRef.current.click()}
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          margin: '0 auto',
          border: isDragOver ? '2px dashed #C1121F' : '1px dashed rgba(255,255,255,0.15)',
          borderRadius: '12px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: imageSrc ? 'default' : 'pointer',
          transition: 'all 0.25s ease'
        }}
      >
        {imageSrc ? (
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translate(${posX}px, ${posY}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.05s linear',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={imageSrc.startsWith('data:') || imageSrc.startsWith('http') ? imageSrc : (imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`)}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}>
            <Upload style={{ margin: '0 auto 12px auto', opacity: 0.6 }} size={28} />
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Drag & Drop file here, or click to upload</p>
            <span style={{ fontSize: '0.68rem', opacity: 0.5 }}>Supports JPEG, PNG, WEBP — Auto uploads to Cloudinary</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {imageSrc && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ZoomIn size={12} /> Zoom ({zoom.toFixed(1)}x)
              </span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                style={{ accentColor: '#C1121F', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Move size={12} /> Align Horizontal ({posX}px)
              </span>
              <input
                type="range"
                min="-150"
                max="150"
                step="1"
                value={posX}
                onChange={(e) => setPosX(parseInt(e.target.value))}
                style={{ accentColor: '#C1121F', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Move size={12} /> Align Vertical ({posY}px)
              </span>
              <input
                type="range"
                min="-150"
                max="150"
                step="1"
                value={posY}
                onChange={(e) => setPosY(parseInt(e.target.value))}
                style={{ accentColor: '#C1121F', cursor: 'pointer' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                Choose Another
              </button>
              <button
                type="button"
                onClick={removeImage}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'rgba(193, 18, 31, 0.1)',
                  border: '1px solid rgba(193, 18, 31, 0.25)',
                  borderRadius: '6px',
                  color: '#FF6B6B',
                  fontSize: '0.72rem',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => cropAndUpload(null, zoom, posX, posY)}
            disabled={isUploading}
            style={{
              padding: '10px',
              backgroundColor: isUploading ? '#666666' : '#C1121F',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 10px rgba(193, 18, 31, 0.2)',
              marginTop: '4px',
              opacity: isUploading ? 0.75 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {isUploading ? 'Uploading to Cloudinary...' : 'Apply Crop & Save Changes'}
          </button>
        </div>
      )}

      {/* Hidden Output Canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

// ==========================================
// 2. BLOG CONTENT HTML GENERATOR FIELD
// ==========================================
function BlogContentEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  const insertTag = (openTag, closeTag = '') => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = openTag + selected + (closeTag || '');
    
    const newValue = text.substring(0, start) + replacement + text.substring(end);
    onChange(newValue);
    
    // Reset focus & cursor selection position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selected.length);
    }, 0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '6px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
        <button type="button" onClick={() => insertTag('<p class="article-lead">', '</p>')} style={helperBtnStyle}>Lead Paragraph</button>
        <button type="button" onClick={() => insertTag('<p>', '</p>')} style={helperBtnStyle}>Normal Paragraph</button>
        <button type="button" onClick={() => insertTag('<h2>', '</h2>')} style={helperBtnStyle}>Heading 2</button>
        <button type="button" onClick={() => insertTag('<blockquote>', '</blockquote>')} style={helperBtnStyle}>Quote Block</button>
        <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} style={helperBtnStyle}>Bullet List</button>
        <button type="button" onClick={() => insertTag('<li>', '</li>')} style={helperBtnStyle}>List Item</button>
        <button type="button" onClick={() => insertTag('<strong>', '</strong>')} style={helperBtnStyle}>Bold</button>
        <button type="button" onClick={() => insertTag('<em>', '</em>')} style={helperBtnStyle}>Italics</button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your editorial narrative content using the format guides above..."
        style={{
          width: '100%',
          height: '240px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#FFFFFF',
          padding: '12px',
          boxSizing: 'border-box',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          lineHeight: '1.5',
          outline: 'none',
          resize: 'vertical'
        }}
      />
    </div>
  );
}

const helperBtnStyle = {
  padding: '4px 8px',
  backgroundColor: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
  color: 'rgba(255,255,255,0.8)',
  fontSize: '0.72rem',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

// ==========================================
// 3. MAIN ADMIN PANEL COMPONENT
// ==========================================
export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const [passcode, setPasscode] = useState('');

  // Dynamic Theme-Aware Helper Styles
  const cardBg = currentTheme.surface;
  const cardBorder = currentTheme.border;
  const textPrimary = currentTheme.text;
  const textSub = currentTheme.subText;

  const panelCardStyle = {
    backgroundColor: currentTheme.surface,
    border: `1px solid ${currentTheme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxSizing: 'border-box'
  };

  const panelHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const panelTitleStyle = {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 500,
    color: currentTheme.text
  };

  const panelLinkStyle = {
    background: 'none',
    border: 'none',
    color: '#C1121F',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0
  };

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 14px',
    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
    border: `1px solid ${currentTheme.border}`,
    borderRadius: '10px'
  };

  const tableWrapperStyle = {
    backgroundColor: currentTheme.surface,
    border: `1px solid ${currentTheme.border}`,
    borderRadius: '16px',
    overflow: 'hidden'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  };

  const thStyle = {
    padding: '16px 20px',
    borderBottom: `1px solid ${currentTheme.border}`,
    fontSize: '0.78rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: currentTheme.subText,
    letterSpacing: '0.5px'
  };

  const trStyle = {
    borderBottom: `1px solid ${currentTheme.border}`,
    transition: 'background-color 0.2s'
  };

  const tdStyle = {
    padding: '16px 20px',
    fontSize: '0.82rem',
    color: currentTheme.text,
    verticalAlign: 'middle'
  };

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: currentTheme.subText,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: currentTheme.inputBg,
    border: `1px solid ${currentTheme.inputBorder}`,
    borderRadius: '8px',
    color: currentTheme.text,
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: currentTheme.inputBg,
    border: `1px solid ${currentTheme.inputBorder}`,
    borderRadius: '8px',
    color: currentTheme.text,
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    width: '100%',
    height: '100px',
    padding: '10px 14px',
    backgroundColor: currentTheme.inputBg,
    border: `1px solid ${currentTheme.inputBorder}`,
    borderRadius: '8px',
    color: currentTheme.text,
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
    lineHeight: '1.4'
  };

  const btnCancelStyle = {
    padding: '10px 20px',
    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    border: `1px solid ${currentTheme.border}`,
    borderRadius: '8px',
    color: currentTheme.text,
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer'
  };

  const btnSubmitStyle = {
    padding: '10px 20px',
    backgroundColor: '#C1121F',
    border: 'none',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer'
  };
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Schema state - initialize directly from db to prevent initial flash/delay
  const [destinations, setDestinations] = useState(() => db.getDestinations());
  const [blogs, setBlogs] = useState(() => db.getBlogs());
  const [careers, setCareers] = useState(() => db.getCareers());
  const [team, setTeam] = useState(() => db.getTeam());
  const [testimonials, setTestimonials] = useState(() => db.getTestimonials());
  const [logos, setLogos] = useState(() => db.getLogos());
  const [inquiries, setInquiries] = useState(() => db.getInquiries());
  const [applications, setApplications] = useState(() => db.getApplications());
  const [activities, setActivities] = useState(() => db.getActivities());


  // Modal / Form overlays
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingInquiry, setViewingInquiry] = useState(null);

  // Form payload binders
  const [destForm, setDestForm] = useState({ name: '', region: '', tagline: '', image: '', description: '' });
  const [blogForm, setBlogForm] = useState({ title: '', category: '', readTime: '', image: '', description: '', content: '' });
  const [careerForm, setCareerForm] = useState({ title: '', location: '', type: 'Full-Time', description: '', status: 'Open' });
  const [teamForm, setTeamForm] = useState({ name: '', position: '', bio: '', image: '', isLeader: false, order: 0, signature: '' });
  const [isTeamImgUploading, setIsTeamImgUploading] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ name: '', company: '', location: '', text: '', rating: 5 });


  // SEO Management states
  const [seo, setSeo] = useState(() => db.getSeo());
  const [selectedSeoPage, setSelectedSeoPage] = useState('home');
  const [seoForm, setSeoForm] = useState({
    title: '',
    description: '',
    url: '',
    canonical: '',
    ogImage: '',
    keywords: '',
    indexable: true
  });
  const [isOgUploading, setIsOgUploading] = useState(false);
  const [seoPreviewTab, setSeoPreviewTab] = useState('google'); // 'google' | 'social'
  const [newKeywordInput, setNewKeywordInput] = useState('');

  const SEO_PAGE_DEFAULTS = {
    home: {
      page: 'home',
      path: '/',
      label: 'Home Page',
      title: 'Travinno - Crafting Journeys, Creating Memories',
      description: 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.',
      url: 'https://travinno.com/',
      canonical: 'https://travinno.com/',
      ogImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      keywords: 'Travinno, luxury travel, DMC Malaysia, B2B travel partner, destination management, bespoke travel packages',
      indexable: true
    },
    about: {
      page: 'about',
      path: '/about',
      label: 'About Us',
      title: 'About Our Journey - Travinno',
      description: 'Explore the legacy, core purpose, and chronological journey of Travinno.',
      url: 'https://travinno.com/about',
      canonical: 'https://travinno.com/about',
      ogImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      keywords: 'about Travinno, travel company history, destination specialists, luxury journey creators',
      indexable: true
    },
    services: {
      page: 'services',
      path: '/#services',
      label: 'Services (Section)',
      title: 'Luxury Travel Services & MICE - Travinno',
      description: 'Discover our premium destination services, corporate retreats, MICE coordination, and bespoke packages.',
      url: 'https://travinno.com/#services',
      canonical: 'https://travinno.com/#services',
      ogImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      keywords: 'MICE travel, corporate retreats, luxury travel services, VIP concierge, bespoke itineraries',
      indexable: true
    },
    destinations: {
      page: 'destinations',
      path: '/destinations',
      label: 'Destinations',
      title: 'Luxury Destinations Showcase - Travinno',
      description: 'Discover futuristic cities, private deserts, and tropical archipelagos designed by Travinno specialists.',
      url: 'https://travinno.com/destinations',
      canonical: 'https://travinno.com/destinations',
      ogImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      keywords: 'luxury destinations, Malaysia travel, Singapore tours, Dubai packages, exotic archipelagos',
      indexable: true
    },
    team: {
      page: 'team',
      path: '/team',
      label: 'Team Members',
      title: 'Our Executive Leadership & Travel Specialists - Travinno',
      description: 'Meet the passionate professionals and travel specialists behind Travinno.',
      url: 'https://travinno.com/team',
      canonical: 'https://travinno.com/team',
      ogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      keywords: 'Travinno leadership, travel specialists, executive travel team, DMC management',
      indexable: true
    },
    testimonials: {
      page: 'testimonials',
      path: '/#testimonials',
      label: 'Testimonials (Section)',
      title: 'What Our B2B Partners Say - Travinno',
      description: 'Read client reviews and testimonials from our global B2B travel partners.',
      url: 'https://travinno.com/#testimonials',
      canonical: 'https://travinno.com/#testimonials',
      ogImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      keywords: 'Travinno reviews, B2B partner testimonials, luxury client feedback, travel partner ratings',
      indexable: true
    },
    careers: {
      page: 'careers',
      path: '/careers',
      label: 'Careers',
      title: 'Careers at Travinno - Join Our Team',
      description: 'Join the dynamic Travinno team. Apply for premium travel and operations positions around the globe.',
      url: 'https://travinno.com/careers',
      canonical: 'https://travinno.com/careers',
      ogImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      keywords: 'travel jobs, tourism careers, luxury travel vacancies, operations positions',
      indexable: true
    },
    blog: {
      page: 'blog',
      path: '/blog',
      label: 'Blog Listing',
      title: 'Travel Journal & Insights - Travinno',
      description: 'Read the latest travel tips, destinations guides, and B2B hospitality insights by Travinno editors.',
      url: 'https://travinno.com/blog',
      canonical: 'https://travinno.com/blog',
      ogImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      keywords: 'travel blog, tourism insights, luxury travel guides, hospitality trends',
      indexable: true
    },
    contact: {
      page: 'contact',
      path: '/contact',
      label: 'Contact Us',
      title: 'Contact Us - Travinno Partner Onboarding',
      description: 'Reach out to establish a B2B partner contract or make custom travel inquiries with Travinno.',
      url: 'https://travinno.com/contact',
      canonical: 'https://travinno.com/contact',
      ogImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80',
      keywords: 'contact Travinno, B2B travel inquiry, partner onboarding, travel agent support',
      indexable: true
    },
    privacy: {
      page: 'privacy',
      path: '/privacy',
      label: 'Privacy Policy',
      title: 'Privacy Policy - Travinno',
      description: 'Our commitment to protecting your privacy and managing personal data responsibly.',
      url: 'https://travinno.com/privacy',
      canonical: 'https://travinno.com/privacy',
      ogImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      keywords: 'privacy policy, data protection, cookies policy, Travinno legal',
      indexable: true
    },
    terms: {
      page: 'terms',
      path: '/terms',
      label: 'Terms & Conditions',
      title: 'Terms & Conditions - Travinno',
      description: 'Terms and conditions governing B2B travel contracts, bookings, and services with Travinno.',
      url: 'https://travinno.com/terms',
      canonical: 'https://travinno.com/terms',
      ogImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      keywords: 'terms and conditions, booking terms, B2B contract guidelines, travel terms',
      indexable: true
    }
  };

  useEffect(() => {
    const pageEntry = seo.find(s => s.page === selectedSeoPage) || SEO_PAGE_DEFAULTS[selectedSeoPage] || {};
    const defaultObj = SEO_PAGE_DEFAULTS[selectedSeoPage] || {};
    setSeoForm({
      title: pageEntry.title !== undefined ? pageEntry.title : (defaultObj.title || ''),
      description: pageEntry.description !== undefined ? pageEntry.description : (defaultObj.description || ''),
      url: pageEntry.url !== undefined && pageEntry.url !== '' ? pageEntry.url : (defaultObj.url || `https://travinno.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`),
      canonical: pageEntry.canonical !== undefined ? pageEntry.canonical : (defaultObj.canonical || `https://travinno.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`),
      ogImage: pageEntry.ogImage !== undefined && pageEntry.ogImage !== '' ? pageEntry.ogImage : (defaultObj.ogImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'),
      keywords: pageEntry.keywords !== undefined ? pageEntry.keywords : (defaultObj.keywords || ''),
      indexable: pageEntry.indexable !== undefined ? pageEntry.indexable : true,
    });
  }, [selectedSeoPage, seo]);

  const autoFillCanonical = () => {
    const defaultObj = SEO_PAGE_DEFAULTS[selectedSeoPage] || {};
    const defaultUrl = defaultObj.canonical || `https://travinno.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`;
    setSeoForm(prev => ({ ...prev, canonical: defaultUrl }));
  };

  const handleOgImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsOgUploading(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = ev.target.result;
      const uploadedUrl = await uploadImageToCloudinary(base64, 'travinno-seo');
      setSeoForm(prev => ({ ...prev, ogImage: uploadedUrl || base64 }));
      setIsOgUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const addFocusKeyword = () => {
    if (!newKeywordInput.trim()) return;
    const currentList = (seoForm.keywords || '').split(',').map(k => k.trim()).filter(Boolean);
    if (!currentList.includes(newKeywordInput.trim())) {
      const updated = [...currentList, newKeywordInput.trim()].join(', ');
      setSeoForm(prev => ({ ...prev, keywords: updated }));
    }
    setNewKeywordInput('');
  };

  const removeFocusKeyword = (kwToRemove) => {
    const currentList = (seoForm.keywords || '').split(',').map(k => k.trim()).filter(Boolean);
    const updated = currentList.filter(k => k.toLowerCase() !== kwToRemove.toLowerCase()).join(', ');
    setSeoForm(prev => ({ ...prev, keywords: updated }));
  };

  const resetSeoToDefaults = () => {
    if (confirm(`Reset SEO settings for ${selectedSeoPage.toUpperCase()} page to recommended brand defaults?`)) {
      const defaultObj = SEO_PAGE_DEFAULTS[selectedSeoPage] || {};
      setSeoForm({
        title: defaultObj.title || '',
        description: defaultObj.description || '',
        url: defaultObj.url || '',
        canonical: defaultObj.canonical || '',
        ogImage: defaultObj.ogImage || '',
        keywords: defaultObj.keywords || '',
        indexable: defaultObj.indexable !== undefined ? defaultObj.indexable : true,
      });
    }
  };

  const saveSeoSettings = (e) => {
    e.preventDefault();
    const updatedSeo = [...seo];
    const index = updatedSeo.findIndex(s => s.page === selectedSeoPage);
    const entry = {
      page: selectedSeoPage,
      title: seoForm.title,
      description: seoForm.description,
      url: seoForm.url,
      canonical: seoForm.canonical,
      ogImage: seoForm.ogImage,
      keywords: seoForm.keywords,
      indexable: seoForm.indexable,
    };
    if (index !== -1) {
      updatedSeo[index] = entry;
    } else {
      updatedSeo.push(entry);
    }
    setSeo(updatedSeo);
    db.saveSeo(updatedSeo, `Updated SEO metadata for ${selectedSeoPage.toUpperCase()} page`);
    alert(`SEO settings for ${selectedSeoPage.toUpperCase()} page saved successfully!`);
  };

  // Initial Auth & Sync load
  useEffect(() => {
    const savedTheme = localStorage.getItem('travinno_theme');
    if (savedTheme) setTheme(savedTheme);
    const isAuth = sessionStorage.getItem('travinno_admin_auth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      loadCollections();
    }
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('travinno_theme', newTheme);
  };

  // Set event listener for dynamic updates
  useEffect(() => {
    if (isAuthenticated) {
      window.addEventListener('travinno-db-update', loadCollections);
      return () => window.removeEventListener('travinno-db-update', loadCollections);
    }
  }, [isAuthenticated]);

  const loadCollections = () => {
    setDestinations(db.getDestinations());
    setBlogs(db.getBlogs());
    setCareers(db.getCareers());
    setTeam(db.getTeam());
    setTestimonials(db.getTestimonials());
    setLogos(db.getLogos());
    setInquiries(db.getInquiries());
    setApplications(db.getApplications());
    setActivities(db.getActivities());

    setSeo(db.getSeo());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const clean = (passcode || '').trim().toLowerCase();
    if (clean === 'travinno2026' || clean === 'travinno@2026') {
      sessionStorage.setItem('travinno_admin_auth', 'true');
      setIsAuthenticated(true);
      db.init();
      loadCollections();
    } else {
      alert('Invalid passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('travinno_admin_auth');
    setIsAuthenticated(false);
    setPasscode('');
    window.location.hash = '';
  };

  // --- CRUD DISPATCHERS ---

  // INQUIRIES ACTIONS
  const toggleInquiryRead = (id) => {
    const list = inquiries.map(inq => {
      if (inq.id === id) {
        const nextStatus = !inq.read;
        db.logActivity(`Marked inquiry from ${inq.name} as ${nextStatus ? 'Read' : 'Unread'}`);
        return { ...inq, read: nextStatus };
      }
      return inq;
    });
    db.saveInquiries(list);
  };

  const deleteInquiry = (id, name) => {
    if (confirm(`Delete message from ${name}?`)) {
      const list = inquiries.filter(inq => inq.id !== id);
      db.saveInquiries(list, `Deleted inquiry from ${name}`);
    }
  };

  // DESTINATIONS CRUD
  const saveDestination = async (e) => {
    e.preventDefault();
    if (!destForm.name || !destForm.description || !destForm.tagline) {
      alert("Please fill all fields.");
      return;
    }

    let finalImage = destForm.image;
    if (finalImage && finalImage.startsWith('data:')) {
      finalImage = await uploadImageToCloudinary(finalImage, 'travinno/destinations');
    }

    const payload = { ...destForm, image: finalImage };
    let list = [...destinations];
    if (editingItem) {
      // Edit
      list = list.map(item => item.id === editingItem.id ? { ...item, ...payload } : item);
      db.saveDestinations(list, `Edited destination country: ${destForm.name}`);
    } else {
      // Add
      const id = destForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (list.some(item => item.id === id)) {
        alert("A destination with this country name already exists.");
        return;
      }
      const newItem = { ...payload, id };
      list.push(newItem);
      db.saveDestinations(list, `Added new destination country: ${destForm.name}`);
    }
    closeForm();
  };

  const deleteDestination = (id, name) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      const list = destinations.filter(item => item.id !== id);
      db.saveDestinations(list, `Deleted destination country: ${name}`);
    }
  };


  // BLOGS CRUD
  const saveBlog = async (e) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.description || !blogForm.content) {
      alert("Please fill all fields.");
      return;
    }

    let finalImage = blogForm.image;
    if (finalImage && finalImage.startsWith('data:')) {
      finalImage = await uploadImageToCloudinary(finalImage, 'travinno/blogs');
    }

    const payload = { ...blogForm, image: finalImage };
    let list = [...blogs];
    const dateFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    if (editingItem) {
      list = list.map(item => item.id === editingItem.id ? { ...item, ...payload } : item);
      db.saveBlogs(list, `Edited blog post: ${blogForm.title}`);
    } else {
      const id = Date.now();
      const newItem = {
        ...payload,
        id,
        date: dateFormatted,
        readTime: blogForm.readTime || `${Math.ceil(blogForm.content.split(/\s+/).length / 200)} min read`
      };
      list.unshift(newItem);
      db.saveBlogs(list, `Published new blog post: ${blogForm.title}`);
    }
    closeForm();
  };

  const deleteBlog = (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const list = blogs.filter(item => String(item.id) !== String(id));
      db.saveBlogs(list, `Deleted blog post: ${title}`);
    }
  };

  // CAREERS CRUD
  const saveCareer = (e) => {
    e.preventDefault();
    if (!careerForm.title || !careerForm.location || !careerForm.description) {
      alert("Please fill all fields.");
      return;
    }
    let list = [...careers];
    if (editingItem) {
      list = list.map(item => item.id === editingItem.id ? { ...item, ...careerForm } : item);
      db.saveCareers(list, `Edited job opening: ${careerForm.title}`);
    } else {
      const id = Date.now();
      list.push({ ...careerForm, id });
      db.saveCareers(list, `Added new job opening: ${careerForm.title}`);
    }
    closeForm();
  };

  const deleteCareer = (id, title) => {
    if (confirm(`Delete job opening: ${title}?`)) {
      const list = careers.filter(item => String(item.id) !== String(id));
      db.saveCareers(list, `Deleted job opening: ${title}`);
    }
  };

  // TEAM CRUD
  const saveTeamMember = async (e) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.position) {
      alert("Please fill name and position.");
      return;
    }
    let finalImage = teamForm.image;
    if (finalImage && finalImage.startsWith('data:')) {
      finalImage = await uploadImageToCloudinary(finalImage, 'travinno/team');
    }
    const payload = { ...teamForm, image: finalImage };
    let list = [...team];
    if (editingItem) {
      list = list.map(item => item.id === editingItem.id ? { ...item, ...payload } : item);
      db.saveTeam(list, `Edited team member: ${teamForm.name}`);
    } else {
      const id = Date.now();
      list.push({ ...payload, id });
      db.saveTeam(list, `Added team member: ${teamForm.name}`);
    }
    closeForm();
  };

  const deleteTeamMember = (id, name) => {
    if (confirm(`Remove team member ${name}?`)) {
      const list = team.filter(item => String(item.id) !== String(id));
      db.saveTeam(list, `Removed team member: ${name}`);
    }
  };

  // TESTIMONIALS CRUD
  const saveTestimonial = (e) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.text) {
      alert("Please fill name and testimonial text.");
      return;
    }
    let list = [...testimonials];
    if (editingItem) {
      list = list.map(item => item.id === editingItem.id ? { ...item, ...testimonialForm } : item);
      db.saveTestimonials(list, `Edited client review: ${testimonialForm.name}`);
    } else {
      const id = Date.now();
      list.push({ ...testimonialForm, id });
      db.saveTestimonials(list, `Added client review: ${testimonialForm.name}`);
    }
    closeForm();
  };

  const deleteTestimonial = (id, name) => {
    if (confirm(`Remove review by ${name}?`)) {
      const list = testimonials.filter(item => String(item.id) !== String(id));
      db.saveTestimonials(list, `Removed review by: ${name}`);
    }
  };

  // BRAND LOGOS CRUD
  const handleAddLogo = async (base64) => {
    if (!base64) return;
    let finalLogo = base64;
    if (base64.startsWith('data:')) {
      finalLogo = await uploadImageToCloudinary(base64, 'travinno/logos');
    }
    const list = [...logos];
    list.push(finalLogo);
    db.saveLogos(list, `Uploaded new client brand logo`);
  };

  const deleteLogo = (idx) => {
    if (confirm(`Remove this client logo?`)) {
      const list = logos.filter((_, i) => i !== idx);
      db.saveLogos(list, `Deleted client brand logo`);
    }
  };

  // FORMS MANAGEMENT
  const openForm = (item = null) => {
    setEditingItem(item);
    if (activeTab === 'destinations') {
      setDestForm(item ? { ...item } : { name: '', region: '', tagline: '', image: '', description: '' });

    } else if (activeTab === 'blogs') {
      setBlogForm(item ? { ...item } : { title: '', category: '', readTime: '', image: '', description: '', content: '' });
    } else if (activeTab === 'careers') {
      setCareerForm(item ? { ...item } : { title: '', location: '', type: 'Full-Time', description: '', status: 'Open' });
    } else if (activeTab === 'team') {
      setTeamForm(item ? { ...item } : { name: '', position: '', bio: '', image: '', isLeader: false, order: 0, signature: '' });
    } else if (activeTab === 'testimonials') {
      setTestimonialForm(item ? { ...item } : { name: '', company: '', location: '', text: '', rating: 5 });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  // ==========================================
  // RENDER: LOGIN FORM
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: currentTheme.bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        padding: '24px',
        boxSizing: 'border-box'
      }}>
        {/* Subtle grid line backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at center, rgba(193, 18, 31, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: currentTheme.surface,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            padding: '40px 32px',
            boxSizing: 'border-box',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            transition: 'background-color 0.3s, color 0.3s'
          }}
        >
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            color: currentTheme.text,
            margin: '0 0 8px 0',
            fontWeight: 450
          }}>
            Travinno <span style={{ color: '#C1121F', fontWeight: 300 }}>CMS</span>
          </h2>
          <p style={{
            fontSize: '0.82rem',
            color: currentTheme.subText,
            margin: '0 0 32px 0',
            letterSpacing: '0.3px'
          }}>
            Enterprise Portal & Administration Panel
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245,242,236,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter entry code..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.25s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C1121F'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#C1121F',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: 600,
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: '0 4px 15px rgba(193, 18, 31, 0.2)',
                textTransform: 'uppercase',
                marginTop: '8px'
              }}
            >
              Access Console
            </button>
          </form>

          <a
            href="#"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              fontSize: '0.75rem',
              color: 'rgba(245,242,236,0.4)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#F5F2EC'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(245,242,236,0.4)'}
          >
            ← Back to Public Website
          </a>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // RENDER: SECURED CORE DASHBOARD PANELS
  // ==========================================
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      display: 'flex',
      color: currentTheme.text,
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s, color 0.3s',
      position: 'relative'
    }}>
      {/* MOBILE OVERLAY */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 99,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}
      {/* SIDEBAR NAVIGATION */}
      <aside style={{
        width: '280px',
        backgroundColor: theme === 'dark' ? '#0A0A0C' : '#FFFFFF',
        borderRight: `1px solid ${currentTheme.border}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 16px',
        boxSizing: 'border-box',
        position: isMobile ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: isMobile ? 100 : 'auto',
        transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease, background-color 0.3s',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Logo Brand */}
          <div style={{ paddingLeft: '12px' }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              margin: '0 0 4px 0',
              fontWeight: 450,
              color: currentTheme.text
            }}>
              Travinno
            </h3>
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#C1121F', fontWeight: 600 }}>
              Administration
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
              { id: 'destinations', label: 'Destinations', icon: <Globe size={16} /> },

              { id: 'blogs', label: 'Blog Posts', icon: <BookOpen size={16} /> },
              { id: 'careers', label: 'Job Openings', icon: <Briefcase size={16} /> },
              { id: 'applications', label: 'Applications', icon: <FileText size={16} /> },
              { id: 'team', label: 'Team Members', icon: <Users size={16} /> },
              { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={16} /> },
              { id: 'logos', label: 'Client Logos', icon: <Image size={16} /> },
              { id: 'inquiries', label: 'Inquiries', icon: <Mail size={16} />, badge: inquiries.filter(i => !i.read).length },
              { id: 'seo', label: 'SEO Settings', icon: <Sliders size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); closeForm(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: activeTab === tab.id ? (theme === 'dark' ? 'rgba(193, 18, 31, 0.15)' : 'rgba(193, 18, 31, 0.08)') : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: activeTab === tab.id ? (theme === 'dark' ? '#FFFFFF' : '#C1121F') : currentTheme.subText,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  borderLeft: `2.5px solid ${activeTab === tab.id ? '#C1121F' : 'transparent'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badge > 0 && (
                  <span style={{
                    padding: '2px 6px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    backgroundColor: '#C1121F',
                    color: '#FFFFFF',
                    borderRadius: '10px'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer: Theme toggle + Logout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '10px',
              color: currentTheme.text,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'opacity 0.2s'
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button
            onClick={async () => {
              if (confirm("Reset the CMS database to initial defaults? This will clear storage limits and restore the original template data, but remove custom modifications.")) {
                try {
                  const { db } = await import('../lib/db');
                  if (db.serverActive) {
                    await fetch(`${db.apiBase}/api/reset`, { method: 'POST' }).catch(() => null);
                  }
                } catch (e) {}
                window.location.reload();
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '10px',
              color: currentTheme.subText,
              fontFamily: 'var(--font-sans)',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'opacity 0.2s'
            }}
          >
            <RotateCcw size={16} />
            <span>Reset Database</span>
          </button>


          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '10px',
              color: '#FF6B6B',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.84rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'opacity 0.2s'
            }}
          >
            <LogOut size={16} />
            <span>Exit Console</span>
          </button>
        </div>
      </aside>

      {/* CORE WORKSPACE CONTENT AREA */}
      <main style={{
        flex: 1,
        padding: isMobile ? '20px 16px' : '48px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        height: '100vh',
        width: isMobile ? '100%' : 'auto',
        minWidth: 0
      }}>
        {/* HEADER BAR */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${currentTheme.border}`,
          paddingBottom: '20px',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            {/* Hamburger on mobile */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  background: 'none',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  padding: '8px',
                  color: currentTheme.text,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0
                }}
              >
                {sidebarOpen ? <XIcon size={20} /> : <Menu size={20} />}
              </button>
            )}
            <div style={{ minWidth: 0 }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isMobile ? '1.3rem' : '2rem',
                fontWeight: 450,
                color: currentTheme.text,
                margin: '0 0 2px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {activeTab.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())} Manager
              </h1>
              {!isMobile && (
                <span style={{ fontSize: '0.78rem', color: currentTheme.subText }}>
                  Real-time synchronization active • Local Database Store
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>


            {!isMobile && (
              <a
                href="#"
                style={{
                  padding: '8px 14px',
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '8px',
                  color: currentTheme.text,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Public Website <ChevronRight size={14} />
              </a>
            )}

            {['destinations', 'blogs', 'careers', 'team', 'testimonials'].includes(activeTab) && (
              <button
                onClick={() => openForm()}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#C1121F',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Plus size={16} /> {isMobile ? 'Add' : `Add ${activeTab === 'blogs' ? 'Post' : activeTab === 'careers' ? 'Job' : 'Item'}`}
              </button>
            )}
          </div>
        </header>

        {/* ==========================================
            VIEW: DASHBOARD
            ========================================== */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* STATS TILES GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '12px' : '20px'
            }}>
              {[
                { label: 'Total Blogs', count: blogs.length, color: '#C1121F' },
                { label: 'Total Destinations', count: destinations.length, color: '#D97706' },
                { label: 'Active Careers', count: careers.filter(c => c.status === 'Open').length, color: '#2EC4B6' },
                { label: 'Team Members', count: team.length, color: '#FF9F1C' },
                { label: 'Client Reviews', count: testimonials.length, color: '#E71D36' },
                { label: 'Client Brand Logos', count: logos.length, color: '#8338EC' },
                { label: 'Unread Inquiries', count: inquiries.filter(i => !i.read).length, color: '#3A86C8' },
                { label: 'Job Applications', count: applications.length, color: '#4CAF50' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: currentTheme.surface,
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '16px',
                    padding: '24px',
                    boxSizing: 'border-box',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100%',
                    backgroundColor: stat.color
                  }} />
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: currentTheme.subText, fontWeight: 600, letterSpacing: '0.5px' }}>
                    {stat.label}
                  </span>
                  <h3 style={{ fontSize: '2.2rem', margin: '8px 0 0 0', fontWeight: 650, color: currentTheme.text, lineHeight: '1' }}>
                    {stat.count}
                  </h3>
                </div>
              ))}
            </div>

            {/* DASHBOARD DETAILS PANEL GROUP */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: '32px' }}>
              {/* LEFT: INQUIRIES & RECENT LOGS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Recent Inquiries */}
                <div style={panelCardStyle}>
                  <div style={panelHeaderStyle}>
                    <h4 style={panelTitleStyle}>Unread Contact Inquiries</h4>
                    <button onClick={() => setActiveTab('inquiries')} style={panelLinkStyle}>View All</button>
                  </div>
                  {inquiries.filter(i => !i.read).length === 0 ? (
                    <p style={{ color: currentTheme.subText, fontSize: '0.82rem', margin: 0, padding: '24px 0', textAlign: 'center' }}>No unread inquiries.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {inquiries.filter(i => !i.read).slice(0, 3).map((inq) => (
                        <div key={inq.id} style={listItemStyle}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: currentTheme.text }}>{inq.name}</span>
                            <span style={{ fontSize: '0.75rem', color: currentTheme.subText, marginLeft: '8px' }}>{inq.agencyName}</span>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: currentTheme.subText, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {inq.message}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleInquiryRead(inq.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(193, 18, 31, 0.1)',
                              border: '1px solid rgba(193, 18, 31, 0.3)',
                              borderRadius: '4px',
                              color: currentTheme.text,
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                          >
                            Mark Read
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Audit Activities Log */}
                <div style={panelCardStyle}>
                  <h4 style={panelTitleStyle}>Audit Trail & Activities</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', marginTop: '16px' }}>
                    {activities.map((act) => (
                      <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${currentTheme.border}`, paddingBottom: '6px', fontSize: '0.78rem' }}>
                        <span style={{ color: currentTheme.text }}>{act.text}</span>
                        <span style={{ color: currentTheme.subText, fontSize: '0.72rem' }}>{act.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: APPLICATIONS & RECENT BLOGS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Recent Job Applications */}
                <div style={panelCardStyle}>
                  <div style={panelHeaderStyle}>
                    <h4 style={panelTitleStyle}>Recent Job Applications</h4>
                    <button onClick={() => setActiveTab('applications')} style={panelLinkStyle}>View All</button>
                  </div>
                  {applications.length === 0 ? (
                    <p style={{ color: currentTheme.subText, fontSize: '0.82rem', margin: 0, padding: '24px 0', textAlign: 'center' }}>No applications.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} style={{ paddingBottom: '10px', borderBottom: `1px solid ${currentTheme.border}`, fontSize: '0.78rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600, color: currentTheme.text }}>{app.fullName}</span>
                            <span style={{ color: '#C1121F', fontSize: '0.72rem' }}>{app.jobTitle}</span>
                          </div>
                          <span style={{ display: 'block', color: currentTheme.subText, fontSize: '0.72rem', marginTop: '2px' }}>{app.date}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Latest Blogs */}
                <div style={panelCardStyle}>
                  <div style={panelHeaderStyle}>
                    <h4 style={panelTitleStyle}>Latest Published Articles</h4>
                    <button onClick={() => setActiveTab('blogs')} style={panelLinkStyle}>Manage</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {blogs.slice(0, 3).map((b) => (
                      <div key={b.id} style={listItemStyle}>
                        <div>
                          <span style={{ fontWeight: 500, fontSize: '0.8rem', color: currentTheme.text }}>{b.title}</span>
                          <span style={{ fontSize: '0.72rem', color: currentTheme.subText, display: 'block', marginTop: '2px' }}>{b.category} • {b.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* ==========================================
            VIEW: DESTINATIONS
            ========================================== */}
        {activeTab === 'destinations' && !isFormOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {destinations.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px'
                }}
              >
                {/* Photo Header */}
                <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Globe size={28} style={{ opacity: 0.3 }} />
                    </div>
                  )}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#C1121F',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {item.region}
                  </span>
                </div>

                {/* Details */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: currentTheme.text, margin: '0 0 4px 0' }}>{item.name}</h3>
                    <p style={{ margin: '0 0 12px 0', fontSize: '0.78rem', color: currentTheme.subText, fontStyle: 'italic' }}>
                      {item.tagline}
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.78rem',
                      color: currentTheme.subText,
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: `1px solid ${currentTheme.border}`, paddingTop: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => openForm(item)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '6px',
                        color: currentTheme.text,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => deleteDestination(item.id, item.name)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(193, 18, 31, 0.1)',
                        border: '1px solid rgba(193, 18, 31, 0.25)',
                        borderRadius: '6px',
                        color: '#FF6B6B',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: BLOG POSTS
            ========================================== */}
        {activeTab === 'blogs' && !isFormOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {blogs.map((b) => (
              <div
                key={b.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  {b.image ? (
                    <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <BookOpen size={20} style={{ opacity: 0.3 }} />
                    </div>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700, color: '#C1121F' }}>
                      {b.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{b.date}</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>•</span>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{b.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px 0', color: '#FFFFFF' }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {b.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openForm(b)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(b.id, b.title)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(193, 18, 31, 0.1)',
                      border: '1px solid rgba(193, 18, 31, 0.25)',
                      borderRadius: '6px',
                      color: '#FF6B6B',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: CAREER OPPORTUNITIES
            ========================================== */}
        {activeTab === 'careers' && !isFormOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {careers.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: 0 }}>{job.title}</h3>
                    <span style={{
                      backgroundColor: job.status === 'Open' ? 'rgba(46, 196, 182, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      color: job.status === 'Open' ? '#2EC4B6' : 'rgba(255,255,255,0.4)',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {job.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '6px' }}>
                    {job.location} • {job.type}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
                    {job.description}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => openForm(job)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => deleteCareer(job.id, job.title)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'rgba(193, 18, 31, 0.1)',
                      border: '1px solid rgba(193, 18, 31, 0.25)',
                      borderRadius: '6px',
                      color: '#FF6B6B',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: JOB APPLICATIONS LOG
            ========================================== */}
        {activeTab === 'applications' && (
          <div style={tableWrapperStyle}>
            {applications.length === 0 ? (
              <p style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>No job applications logged.</p>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Applicant</th>
                    <th style={thStyle}>Job Title</th>
                    <th style={thStyle}>Contact Details</th>
                    <th style={thStyle}>Resume File</th>
                    <th style={thStyle}>Cover Letter</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} style={trStyle}>
                      <td style={tdStyle}>{app.date}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#FFFFFF' }}>{app.fullName}</td>
                      <td style={{ ...tdStyle, color: '#C1121F', fontWeight: 500 }}>{app.jobTitle}</td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: '0.75rem' }}>{app.email}</div>
                        <div style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: '2px' }}>{app.phone}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontSize: '0.75rem', color: '#2EC4B6', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={12} /> {app.fileName || 'resume.pdf'}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {app.coverLetter}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => alert(`Applicant Cover Letter:\n\n${app.coverLetter}`)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '4px',
                              color: '#FFFFFF',
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                          >
                            Read
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove application from ${app.fullName}?`)) {
                                db.saveApplications(applications.filter(item => item.id !== app.id), `Deleted job application from ${app.fullName}`);
                              }
                            }}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(193,18,31,0.1)',
                              border: '1px solid rgba(193,18,31,0.25)',
                              borderRadius: '4px',
                              color: '#FF6B6B',
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ==========================================
            VIEW: TEAM MEMBERS
            ========================================== */}
        {activeTab === 'team' && !isFormOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {team.map((member) => (
              <div
                key={member.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px'
                }}
              >
                <div>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px auto', border: '2px solid rgba(255,255,255,0.1)' }}>
                    {member.image ? (
                      <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Users size={20} style={{ opacity: 0.3 }} />
                      </div>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1rem', color: '#FFFFFF', margin: '0 0 4px 0' }}>{member.name}</h3>
                  <span style={{ fontSize: '0.72rem', color: '#C1121F', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                    {member.position}
                  </span>
                  {member.isLeader && (
                    <span style={{ display: 'block', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px', textTransform: 'uppercase' }}>Managing Director</span>
                  )}
                  <span style={{ display: 'block', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                    Order: {member.order || 0}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', marginTop: '16px' }}>
                  <button
                    onClick={() => openForm(member)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTeamMember(member.id, member.name)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: 'rgba(193, 18, 31, 0.1)',
                      border: '1px solid rgba(193, 18, 31, 0.25)',
                      borderRadius: '6px',
                      color: '#FF6B6B',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: TESTIMONIALS
            ========================================== */}
        {activeTab === 'testimonials' && !isFormOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {testimonials.map((review) => (
              <div
                key={review.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} style={{ color: '#C1121F', fontSize: '0.85rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', lineHeight: '1.5' }}>
                    "{review.text}"
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '14px', marginTop: '8px' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', display: 'block', color: '#FFFFFF' }}>{review.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>{review.company} • {review.location}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openForm(review)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTestimonial(review.id, review.name)}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: 'rgba(193, 18, 31, 0.1)',
                        border: '1px solid rgba(193, 18, 31, 0.25)',
                        borderRadius: '6px',
                        color: '#FF6B6B',
                        fontSize: '0.7rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            VIEW: CLIENT LOGOS
            ========================================== */}
        {activeTab === 'logos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <ImageCropper title="Add Brand Partner Logo" onImageCropped={handleAddLogo} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px'
            }}>
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '24px',
                    boxSizing: 'border-box',
                    position: 'relative',
                    height: '120px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <img src={logo.startsWith('data:') || logo.startsWith('http') ? logo : `${'/' || '/'}${logo}`} alt="Partner Logo" style={{ maxWidth: '90%', maxHeight: '60px', objectFit: 'contain', opacity: 0.65 }} />
                  <button
                    onClick={() => deleteLogo(idx)}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(193, 18, 31, 0.1)',
                      border: '1px solid rgba(193, 18, 31, 0.3)',
                      color: '#FF6B6B',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            VIEW: CONTACT INQUIRIES
            ========================================== */}
        {activeTab === 'inquiries' && (
          <div style={tableWrapperStyle}>
            {inquiries.length === 0 ? (
              <p style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>No inquiries received yet.</p>
            ) : (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Sender Name</th>
                    <th style={thStyle}>Agency Name</th>
                    <th style={thStyle}>Contact Details</th>
                    <th style={thStyle}>Message Snippet</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <tr key={inq.id} style={{ ...trStyle, backgroundColor: !inq.read ? 'rgba(193, 18, 31, 0.02)' : 'transparent' }}>
                      <td style={tdStyle}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: !inq.read ? '#C1121F' : 'rgba(255,255,255,0.15)'
                        }} />
                      </td>
                      <td style={tdStyle}>{inq.date}</td>
                      <td style={{ ...tdStyle, fontWeight: !inq.read ? 600 : 400, color: !inq.read ? '#FFFFFF' : 'rgba(255,255,255,0.8)' }}>
                        {inq.name}
                      </td>
                      <td style={tdStyle}>{inq.agencyName}</td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: '0.75rem' }}>{inq.email}</div>
                        <div style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: '2px' }}>{inq.phone}</div>
                      </td>
                      <td style={{ ...tdStyle, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inq.message}
                      </td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => setViewingInquiry(inq)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '4px',
                              color: '#FFFFFF',
                              fontSize: '0.7rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Eye size={10} /> View
                          </button>
                          <button
                            onClick={() => toggleInquiryRead(inq.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '4px',
                              color: 'rgba(255,255,255,0.7)',
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                          >
                            {inq.read ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          <button
                            onClick={() => deleteInquiry(inq.id, inq.name)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: 'rgba(193,18,31,0.1)',
                              border: '1px solid rgba(193,18,31,0.25)',
                              borderRadius: '4px',
                              color: '#FF6B6B',
                              fontSize: '0.7rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ==========================================
            VIEW: SEO MANAGEMENT
            ========================================== */}
        {activeTab === 'seo' && (
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '24px',
            alignItems: 'flex-start'
          }}>
            {/* Pages selection sub-sidebar */}
            <div style={{
              width: isMobile ? '100%' : '260px',
              backgroundColor: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '16px',
              padding: '16px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              flexShrink: 0
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: currentTheme.subText,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                paddingLeft: '12px',
                marginBottom: '8px'
              }}>
                Website Pages
              </span>
              {[
                { key: 'home', label: 'Home Page', path: '/' },
                { key: 'about', label: 'About Us', path: '/about' },
                { key: 'services', label: 'Services (Section)', path: '/#services' },
                { key: 'destinations', label: 'Destinations', path: '/destinations' },
                { key: 'team', label: 'Team Members', path: '/team' },
                { key: 'testimonials', label: 'Testimonials (Section)', path: '/#testimonials' },
                { key: 'careers', label: 'Careers', path: '/careers' },
                { key: 'blog', label: 'Blog Listing', path: '/blog' },
                { key: 'contact', label: 'Contact Us', path: '/contact' },
                { key: 'privacy', label: 'Privacy Policy', path: '/privacy' },
                { key: 'terms', label: 'Terms & Conditions', path: '/terms' }
              ].map(p => {
                const isSelected = selectedSeoPage === p.key;
                const hasCustom = seo.some(s => s.page === p.key && (s.title || s.description || s.canonical || s.ogImage || s.keywords));
                return (
                  <button
                    key={p.key}
                    onClick={() => setSelectedSeoPage(p.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: isSelected ? 'rgba(193, 18, 31, 0.12)' : 'transparent',
                      border: isSelected ? '1px solid rgba(193, 18, 31, 0.3)' : '1px solid transparent',
                      borderRadius: '8px',
                      color: isSelected ? currentTheme.text : currentTheme.subText,
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{p.label}</span>
                    <span style={{
                      fontSize: '0.62rem',
                      padding: '2px 6px',
                      borderRadius: '100px',
                      backgroundColor: hasCustom ? 'rgba(46, 196, 182, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      color: hasCustom ? '#2EC4B6' : currentTheme.subText,
                      fontWeight: 600
                    }}>
                      {hasCustom ? 'Custom' : 'Default'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Editing form panel */}
            <div style={{
              flex: 1,
              backgroundColor: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '16px',
              padding: isMobile ? '20px' : '32px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                borderBottom: `1px solid ${currentTheme.border}`,
                paddingBottom: '20px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: currentTheme.text, margin: 0, fontWeight: 600 }}>
                      SEO & Social Metadata
                    </h3>
                    <span style={{
                      fontSize: '0.68rem',
                      backgroundColor: 'rgba(193, 18, 31, 0.15)',
                      color: '#C1121F',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {selectedSeoPage}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: currentTheme.subText }}>
                    Configure search engine title, description, canonical URL, focus words, and social cards.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={resetSeoToDefaults}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.subText,
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    <RefreshCw size={13} /> Reset Defaults
                  </button>
                  <a
                    href={seoForm.url || `https://travinno.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '8px',
                      color: currentTheme.subText,
                      fontSize: '0.76rem',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                  >
                    <ExternalLink size={13} /> View Live
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={saveSeoSettings} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                
                {/* 1. TITLE FIELD (matches screenshot) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <Sparkles size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Title <HelpCircle size={14} color={currentTheme.subText} title="Appears in browser tab and Google headline" />
                      </span>
                    </div>

                    <span style={{
                      backgroundColor: seoForm.title.length > 0 && seoForm.title.length <= 60 ? '#10B981' : (seoForm.title.length > 60 ? '#F59E0B' : '#EF4444'),
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '100px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ✓ {seoForm.title.length} characters
                    </span>
                  </div>

                  <input
                    type="text"
                    required
                    value={seoForm.title}
                    onChange={(e) => setSeoForm({ ...seoForm, title: e.target.value })}
                    style={{
                      ...inputStyle,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      borderColor: seoForm.title.length > 60 ? 'rgba(245, 158, 11, 0.5)' : currentTheme.inputBorder
                    }}
                    placeholder="e.g. Travinno - Crafting Journeys, Creating Memories"
                  />

                  <div style={{ fontSize: '0.78rem', color: currentTheme.subText, lineHeight: '1.4' }}>
                    {seoForm.title || <span style={{ opacity: 0.5 }}>Title will appear here...</span>}
                  </div>
                </div>

                {/* 2. DESCRIPTION FIELD (matches screenshot) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <MessageSquare size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Description <HelpCircle size={14} color={currentTheme.subText} title="The snippet summary displayed in search engines" />
                      </span>
                    </div>

                    <span style={{
                      backgroundColor: seoForm.description.length > 0 && seoForm.description.length <= 160 ? '#10B981' : (seoForm.description.length > 160 ? '#F59E0B' : '#EF4444'),
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '100px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ✓ {seoForm.description.length} characters
                    </span>
                  </div>

                  <textarea
                    required
                    value={seoForm.description}
                    onChange={(e) => setSeoForm({ ...seoForm, description: e.target.value })}
                    style={{
                      ...textareaStyle,
                      height: '90px',
                      fontSize: '0.85rem',
                      borderColor: seoForm.description.length > 160 ? 'rgba(245, 158, 11, 0.5)' : currentTheme.inputBorder
                    }}
                    placeholder="Enter meta description summary..."
                  />

                  <div style={{ fontSize: '0.78rem', color: currentTheme.subText, lineHeight: '1.4' }}>
                    {seoForm.description || <span style={{ opacity: 0.5 }}>Description narrative preview...</span>}
                  </div>
                </div>

                {/* 3. URL & INDEXING FIELD (matches screenshot) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <LinkIcon size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        URL <HelpCircle size={14} color={currentTheme.subText} title="Public page URL and indexing policy" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSeoForm(prev => ({ ...prev, indexable: !prev.indexable }))}
                      style={{
                        backgroundColor: seoForm.indexable ? '#10B981' : '#EF4444',
                        color: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '100px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                      title="Click to toggle Indexable / Not Indexable"
                    >
                      {seoForm.indexable ? (
                        <>✓ Indexable</>
                      ) : (
                        <>✕ Not Indexable <HelpCircle size={13} /></>
                      )}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={seoForm.url}
                      onChange={(e) => setSeoForm({ ...seoForm, url: e.target.value })}
                      style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.82rem' }}
                      placeholder="https://travinno.com/..."
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: currentTheme.subText }}>
                    <span>
                      Robots Directive: <strong>{seoForm.indexable ? 'index, follow' : 'noindex, nofollow'}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeoForm(prev => ({ ...prev, indexable: !prev.indexable }))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#C1121F',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Toggle to {seoForm.indexable ? 'Not Indexable' : 'Indexable'}
                    </button>
                  </div>
                </div>

                {/* 4. CANONICAL FIELD (matches screenshot & fixes Missing status) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <Globe size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Canonical <HelpCircle size={14} color={currentTheme.subText} title="Specifies the authoritative master URL to search engines" />
                      </span>
                    </div>

                    {seoForm.canonical && seoForm.canonical.trim() !== '' ? (
                      <span style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        color: '#10B981',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '100px'
                      }}>
                        ✓ Canonical Defined
                      </span>
                    ) : (
                      <span style={{
                        color: '#F87171',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        Missing
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={seoForm.canonical}
                      onChange={(e) => setSeoForm({ ...seoForm, canonical: e.target.value })}
                      style={{
                        ...inputStyle,
                        fontFamily: 'monospace',
                        fontSize: '0.82rem',
                        borderColor: !seoForm.canonical ? 'rgba(239, 68, 68, 0.4)' : currentTheme.inputBorder
                      }}
                      placeholder="https://travinno.com/..."
                    />
                    <button
                      type="button"
                      onClick={autoFillCanonical}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${currentTheme.border}`,
                        borderRadius: '8px',
                        color: currentTheme.text,
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Auto-fill
                    </button>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: currentTheme.subText }}>
                    {seoForm.canonical ? (
                      <span style={{ fontFamily: 'monospace' }}>{seoForm.canonical}</span>
                    ) : (
                      <span style={{ color: '#F87171' }}>Missing — Click "Auto-fill" to assign canonical tag and prevent SEO penalty.</span>
                    )}
                  </div>
                </div>

                {/* 5. SOCIAL SHARE IMAGE (OG & Twitter Image) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <Share2 size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Social Image (OpenGraph & Twitter) <HelpCircle size={14} color={currentTheme.subText} title="The featured image shown on WhatsApp, Facebook, LinkedIn, Twitter" />
                      </span>
                    </div>

                    <span style={{
                      backgroundColor: 'rgba(157, 78, 221, 0.15)',
                      color: '#C77DFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '100px'
                    }}>
                      1200 × 630 px
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '16px', alignItems: 'center' }}>
                    {/* Image Preview Box */}
                    <div style={{
                      width: isMobile ? '100%' : '200px',
                      height: '110px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      border: `1px solid ${currentTheme.border}`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {seoForm.ogImage ? (
                        <img
                          src={seoForm.ogImage}
                          alt="Social share preview"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: currentTheme.subText }}>No Image</span>
                      )}
                      {isOgUploading && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#E0A96D',
                          fontSize: '0.72rem',
                          fontWeight: 600
                        }}>
                          Uploading to CDN...
                        </div>
                      )}
                    </div>

                    {/* Uploader / URL Controls */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                      <input
                        type="text"
                        value={seoForm.ogImage}
                        onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                        style={{ ...inputStyle, fontSize: '0.8rem' }}
                        placeholder="Paste image URL (https://res.cloudinary.com/...)"
                      />

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <label style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          backgroundColor: 'rgba(193, 18, 31, 0.1)',
                          border: '1px solid rgba(193, 18, 31, 0.3)',
                          borderRadius: '6px',
                          color: '#C1121F',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}>
                          <Upload size={13} /> Upload to Cloudinary
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleOgImageFileChange}
                            style={{ display: 'none' }}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const defaultObj = SEO_PAGE_DEFAULTS[selectedSeoPage] || {};
                            setSeoForm(prev => ({ ...prev, ogImage: defaultObj.ogImage || '' }));
                          }}
                          style={{
                            padding: '7px 12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            border: `1px solid ${currentTheme.border}`,
                            borderRadius: '6px',
                            color: currentTheme.subText,
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                          }}
                        >
                          Use Page Default
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. SEO FOCUS WORDS (Keywords) */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(157, 78, 221, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9D4EDD'
                      }}>
                        <Tag size={17} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: currentTheme.text, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        SEO Focus Words / Keywords <HelpCircle size={14} color={currentTheme.subText} title="Keywords targeted for search engine ranking on this page" />
                      </span>
                    </div>

                    <span style={{
                      backgroundColor: 'rgba(157, 78, 221, 0.15)',
                      color: '#C77DFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: '100px'
                    }}>
                      {(seoForm.keywords || '').split(',').map(k => k.trim()).filter(Boolean).length} keywords
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newKeywordInput}
                      onChange={(e) => setNewKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFocusKeyword();
                        }
                      }}
                      style={{ ...inputStyle, fontSize: '0.85rem' }}
                      placeholder="Add focus keyword (e.g. luxury DMC, Malaysia travel) and press Enter..."
                    />
                    <button
                      type="button"
                      onClick={addFocusKeyword}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#C1121F',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Add
                    </button>
                  </div>

                  {/* Keyword tag pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '32px' }}>
                    {(seoForm.keywords || '').split(',').map(k => k.trim()).filter(Boolean).map((kw, i) => {
                      const inTitle = seoForm.title.toLowerCase().includes(kw.toLowerCase());
                      const inDesc = seoForm.description.toLowerCase().includes(kw.toLowerCase());
                      return (
                        <span
                          key={i}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            backgroundColor: inTitle && inDesc ? 'rgba(16, 185, 129, 0.15)' : (inTitle || inDesc ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.06)'),
                            border: `1px solid ${inTitle && inDesc ? 'rgba(16, 185, 129, 0.3)' : (inTitle || inDesc ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255, 255, 255, 0.1)')}`,
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            color: inTitle && inDesc ? '#10B981' : (inTitle || inDesc ? '#F59E0B' : currentTheme.text)
                          }}
                        >
                          <strong>{kw}</strong>
                          <span style={{ fontSize: '0.62rem', opacity: 0.7 }}>
                            {inTitle && inDesc ? '✓ Title & Desc' : (inTitle ? '✓ In Title' : (inDesc ? '✓ In Desc' : '○ Not used'))}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFocusKeyword(kw)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'inherit',
                              cursor: 'pointer',
                              padding: 0,
                              fontSize: '0.8rem',
                              marginLeft: '2px',
                              lineHeight: 1
                            }}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {/* Focus word checklist */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '8px',
                    paddingTop: '6px',
                    fontSize: '0.74rem',
                    color: currentTheme.subText
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#10B981" /> Keywords saved to page meta & used for search ranking
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#10B981" /> Separate multiple phrases with commas
                    </span>
                  </div>
                </div>

                {/* 7. LIVE SEARCH & SOCIAL PREVIEWS */}
                <div style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: currentTheme.text }}>
                      Live Snippet & Social Previews
                    </span>
                    <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setSeoPreviewTab('google')}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: seoPreviewTab === 'google' ? '#C1121F' : 'transparent',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Google Search
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoPreviewTab('social')}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: seoPreviewTab === 'social' ? '#C1121F' : 'transparent',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Social Card (OG)
                      </button>
                    </div>
                  </div>

                  {seoPreviewTab === 'google' ? (
                    /* Google Search Snippet Preview */
                    <div style={{
                      backgroundColor: theme === 'dark' ? '#1E1F20' : '#FFFFFF',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius: '10px',
                      padding: '16px',
                      fontFamily: 'arial, sans-serif'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#C1121F',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 700
                        }}>
                          T
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.8rem', color: theme === 'dark' ? '#DADCE0' : '#202124', fontWeight: 500 }}>
                            Travinno
                          </span>
                          <span style={{ fontSize: '0.72rem', color: theme === 'dark' ? '#9AA0A6' : '#5F6368' }}>
                            {seoForm.canonical || `https://travinno.com/${selectedSeoPage === 'home' ? '' : selectedSeoPage}`}
                          </span>
                        </div>
                      </div>
                      <div style={{
                        fontSize: '1.05rem',
                        color: theme === 'dark' ? '#8AB4F8' : '#1A0DAB',
                        fontWeight: 400,
                        marginBottom: '4px',
                        lineHeight: '1.3'
                      }}>
                        {seoForm.title || 'Travinno - Crafting Journeys, Creating Memories'}
                      </div>
                      <div style={{
                        fontSize: '0.82rem',
                        color: theme === 'dark' ? '#BDC1C6' : '#4D5156',
                        lineHeight: '1.4'
                      }}>
                        {seoForm.description || 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.'}
                      </div>
                    </div>
                  ) : (
                    /* Social Card Preview */
                    <div style={{
                      backgroundColor: theme === 'dark' ? '#1E1F20' : '#F0F2F5',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      maxWidth: '520px'
                    }}>
                      <div style={{ height: '220px', width: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
                        <img
                          src={seoForm.ogImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'}
                          alt="Social card"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: theme === 'dark' ? '#9AA0A6' : '#65676B', fontWeight: 600, letterSpacing: '0.5px' }}>
                          travinno.com
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: theme === 'dark' ? '#FFFFFF' : '#050505', lineHeight: '1.3' }}>
                          {seoForm.title || 'Travinno - Crafting Journeys, Creating Memories'}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: theme === 'dark' ? '#BDC1C6' : '#65676B', lineHeight: '1.4' }}>
                          {seoForm.description || 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Note Banner */}
                <div style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(193, 18, 31, 0.04)',
                  border: '1px solid rgba(193, 18, 31, 0.15)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#C1121F',
                    borderRadius: '50%',
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: '0.74rem', color: currentTheme.subText, lineHeight: '1.4' }}>
                    <strong>Instant Live Sync:</strong> When saved, Title, Description, Canonical URL, Robots, OG Social Image, and Focus Keywords are written directly to MySQL and served dynamically via Server-Side Rendering (SSR) & Next.js metadata to Google, WhatsApp, Facebook, LinkedIn, Twitter, and all web crawlers.
                  </span>
                </div>

                {/* Form Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
                  <button
                    type="submit"
                    style={{
                      ...btnSubmitStyle,
                      padding: '12px 28px',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Check size={16} /> Save SEO Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================
            FORM OVERLAY PANEL (ADD/EDIT DIALOG)
            ========================================== */}
        {isFormOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: '24px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: currentTheme.surface,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '20px',
              padding: '32px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${currentTheme.border}`, paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', color: currentTheme.text, margin: 0 }}>
                  {editingItem ? 'Edit Existing' : 'Add New'} {activeTab.slice(0, -1)}
                </h3>
                <button
                  onClick={closeForm}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* DYNAMIC FORM VIEWS */}



              {/* 1. Destinations Form */}
              {activeTab === 'destinations' && (
                <form onSubmit={saveDestination} style={formGroupStyle}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Country Name</label>
                    <input
                      type="text"
                      required
                      value={destForm.name}
                      onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Dubai"
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Region</label>
                    <input
                      type="text"
                      required
                      value={destForm.region}
                      onChange={(e) => setDestForm({ ...destForm, region: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Middle East or Southeast Asia"
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Short Description Tagline</label>
                    <input
                      type="text"
                      required
                      value={destForm.tagline}
                      onChange={(e) => setDestForm({ ...destForm, tagline: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Futuristic architectural marvels meet sands."
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Detailed Narrative Content (Single Paragraph)</label>
                    <textarea
                      required
                      value={destForm.description}
                      onChange={(e) => setDestForm({ ...destForm, description: e.target.value })}
                      style={textareaStyle}
                      placeholder="Detailed paragraph narrative describing the country, culture, and travel experiences..."
                    />
                  </div>

                  <ImageCropper
                    title="Country Cover & Hero Image"
                    currentImage={destForm.image}
                    onImageCropped={(base64) => setDestForm({ ...destForm, image: base64 })}
                  />

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeForm} style={btnCancelStyle}>Cancel</button>
                    <button type="submit" style={btnSubmitStyle}>Save Destination</button>
                  </div>
                </form>
              )}

              {/* 2. Blogs Form */}
              {activeTab === 'blogs' && (
                <form onSubmit={saveBlog} style={formGroupStyle}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Post Title</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. The Art of Slow Travel in Kenya"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Category</label>
                      <input
                        type="text"
                        required
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. Expeditions"
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Read Time (Optional)</label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. 5 min read"
                      />
                    </div>
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Short Lead Summary Description</label>
                    <input
                      type="text"
                      required
                      value={blogForm.description}
                      onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. An editorial guide on experiencing the wild..."
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Detailed Article Body (Paragraph Editor)</label>
                    <BlogContentEditor
                      value={blogForm.content}
                      onChange={(val) => setBlogForm({ ...blogForm, content: val })}
                    />
                  </div>

                  <ImageCropper
                    title="Article Banner Image"
                    currentImage={blogForm.image}
                    onImageCropped={(base64) => setBlogForm({ ...blogForm, image: base64 })}
                  />

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeForm} style={btnCancelStyle}>Cancel</button>
                    <button type="submit" style={btnSubmitStyle}>Publish Article</button>
                  </div>
                </form>
              )}

              {/* 3. Careers Form */}
              {activeTab === 'careers' && (
                <form onSubmit={saveCareer} style={formGroupStyle}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Job Title</label>
                    <input
                      type="text"
                      required
                      value={careerForm.title}
                      onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Senior Travel Consultant"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Location</label>
                      <input
                        type="text"
                        required
                        value={careerForm.location}
                        onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. Dubai, UAE"
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Job Type</label>
                      <select
                        value={careerForm.type}
                        onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })}
                        style={selectStyle}
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Opening Status</label>
                      <select
                        value={careerForm.status}
                        onChange={(e) => setCareerForm({ ...careerForm, status: e.target.value })}
                        style={selectStyle}
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Brief Description</label>
                    <textarea
                      required
                      value={careerForm.description}
                      onChange={(e) => setCareerForm({ ...careerForm, description: e.target.value })}
                      style={textareaStyle}
                      placeholder="Describe the job role, tasks and key responsibilities..."
                    />
                  </div>

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeForm} style={btnCancelStyle}>Cancel</button>
                    <button type="submit" style={btnSubmitStyle}>Save Position</button>
                  </div>
                </form>
              )}

              {/* 4. Team Members Form */}
              {activeTab === 'team' && (
                <form onSubmit={saveTeamMember} style={formGroupStyle}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Member Full Name</label>
                    <input
                      type="text"
                      required
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Prinu Santhappan"
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Designation / Title</label>
                    <input
                      type="text"
                      required
                      value={teamForm.position}
                      onChange={(e) => setTeamForm({ ...teamForm, position: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Managing Director"
                    />
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Display Order</label>
                    <input
                      type="number"
                      required
                      value={teamForm.order !== undefined ? teamForm.order : 0}
                      onChange={(e) => setTeamForm({ ...teamForm, order: parseInt(e.target.value) || 0 })}
                      style={inputStyle}
                      placeholder="e.g. 1"
                    />
                  </div>

                  <div style={{ ...fieldStyle, flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <input
                      type="checkbox"
                      id="isLeaderCheck"
                      checked={teamForm.isLeader}
                      onChange={(e) => setTeamForm({ ...teamForm, isLeader: e.target.checked })}
                      style={{ accentColor: '#C1121F', cursor: 'pointer' }}
                    />
                    <label htmlFor="isLeaderCheck" style={{ fontSize: '0.8rem', color: '#FFFFFF', cursor: 'pointer' }}>
                      Mark as Executive Leader (Managing Director featured layout)
                    </label>
                  </div>

                  {teamForm.isLeader && (
                    <>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Personal Message / Introduction</label>
                        <textarea
                          value={teamForm.bio || ''}
                          onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                          style={{ ...textareaStyle, height: '140px' }}
                          placeholder="A personal message or introduction from the Managing Director..."
                        />
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>Signature Text</label>
                        <input
                          type="text"
                          value={teamForm.signature || ''}
                          onChange={(e) => setTeamForm({ ...teamForm, signature: e.target.value })}
                          style={inputStyle}
                          placeholder="e.g. Prinu Santhappan"
                        />
                      </div>
                    </>
                  )}

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Profile Portrait Photo (PNG transparent recommended)</label>
                    <div
                      onClick={() => document.getElementById('team-image-file').click()}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px dashed rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        padding: '30px 20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#C1121F';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <input
                        type="file"
                        id="team-image-file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setIsTeamImgUploading(true);
                            const reader = new FileReader();
                            reader.onload = async (event) => {
                              const img = new window.Image();
                              img.src = event.target.result;
                              img.onload = async () => {
                                const canvas = document.createElement('canvas');
                                canvas.width = img.width;
                                canvas.height = img.height;
                                const ctx = canvas.getContext('2d');
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img, 0, 0);
                                const webpDataUrl = canvas.toDataURL('image/webp', 0.85);

                                try {
                                  const uploadRes = await fetch('/api/upload', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ image: webpDataUrl, folder: 'travinno/team' }),
                                  });
                                  const uploadData = await uploadRes.json();
                                  if (uploadData.success && uploadData.url) {
                                    setTeamForm(prev => ({ ...prev, image: uploadData.url }));
                                    alert("Team photo uploaded to Cloudinary successfully!");
                                    setIsTeamImgUploading(false);
                                    return;
                                  }
                                } catch (_) {}

                                // Fallback to local base64
                                setTeamForm(prev => ({ ...prev, image: webpDataUrl }));
                                setIsTeamImgUploading(false);
                              };
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      
                      {isTeamImgUploading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px' }}>
                          <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 600 }}>
                            Uploading to Cloudinary...
                          </span>
                        </div>
                      ) : teamForm.image ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={teamForm.image.startsWith('data:') || teamForm.image.startsWith('http') ? teamForm.image : (teamForm.image.startsWith('/') ? teamForm.image : `/${teamForm.image}`)}
                            alt="Preview"
                            style={{ maxHeight: '160px', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTeamForm({ ...teamForm, image: '' });
                            }}
                            style={{
                              backgroundColor: '#C1121F',
                              border: 'none',
                              color: '#FFFFFF',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.78rem',
                              fontFamily: 'var(--font-sans)',
                              fontWeight: 600,
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                          >
                            Remove Photo
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
                            Click to upload transparent PNG
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-sans)' }}>
                            Uploaded directly to Cloudinary CDN
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeForm} style={btnCancelStyle}>Cancel</button>
                    <button type="submit" style={btnSubmitStyle}>Save Profile</button>
                  </div>
                </form>
              )}

              {/* 5. Testimonials Form */}
              {activeTab === 'testimonials' && (
                <form onSubmit={saveTestimonial} style={formGroupStyle}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Client Name</label>
                    <input
                      type="text"
                      required
                      value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Alexander Mercer"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Agency / Company Name</label>
                      <input
                        type="text"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. Mercer Estates"
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Location (City, Country)</label>
                      <input
                        type="text"
                        value={testimonialForm.location}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                        style={inputStyle}
                        placeholder="e.g. London, UK"
                      />
                    </div>
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Rating (Stars)</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                      style={selectStyle}
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                    </select>
                  </div>

                  <div style={fieldStyle}>
                    <label style={labelStyle}>Review Text</label>
                    <textarea
                      required
                      value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                      style={textareaStyle}
                      placeholder="Testimonial or feedback narrative..."
                    />
                  </div>

                  <div style={formActionsStyle}>
                    <button type="button" onClick={closeForm} style={btnCancelStyle}>Cancel</button>
                    <button type="submit" style={btnSubmitStyle}>Save Review</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ==========================================
            INQUIRY VIEW MODAL OVERLAY
            ========================================== */}
        {viewingInquiry && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            padding: '24px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '550px',
              backgroundColor: '#0C0C0E',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', margin: 0 }}>Inquiry Details</h3>
                <button onClick={() => setViewingInquiry(null)} style={{ backgroundColor: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Date Received:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{viewingInquiry.date}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Sender:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{viewingInquiry.name}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Agency Name:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{viewingInquiry.agencyName || 'N/A'}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Email:</span>
                  <a href={`mailto:${viewingInquiry.email}`} style={{ color: '#C1121F', textDecoration: 'none', fontWeight: 500 }}>{viewingInquiry.email}</a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Phone:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{viewingInquiry.phone || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>Message:</span>
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {viewingInquiry.message}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    toggleInquiryRead(viewingInquiry.id);
                    setViewingInquiry(null);
                  }}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Close & Mark Read
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ==========================================
// CSS STYLINGS BINDERS
// ==========================================
const panelCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '16px',
  padding: '24px',
  boxSizing: 'border-box'
};

const panelHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  paddingBottom: '12px',
  marginBottom: '16px'
};

const panelTitleStyle = {
  fontSize: '0.92rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#FFFFFF',
  margin: 0
};

const panelLinkStyle = {
  fontSize: '0.78rem',
  color: '#C1121F',
  background: 'none',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  backgroundColor: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(255,255,255,0.03)',
  borderRadius: '8px'
};

const tableWrapperStyle = {
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
  overflow: 'hidden'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left'
};

const thStyle = {
  padding: '16px 20px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  fontSize: '0.78rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  letterSpacing: '0.5px'
};

const trStyle = {
  borderBottom: '1px solid rgba(255,255,255,0.04)',
  transition: 'background-color 0.2s'
};

const tdStyle = {
  padding: '16px 20px',
  fontSize: '0.82rem',
  color: 'rgba(255,255,255,0.85)',
  verticalAlign: 'middle'
};

// FORM INLINE STYLES
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontSize: '0.72rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const selectStyle = {
  width: '100%',
  padding: '10px 14px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  height: '100px',
  padding: '10px 14px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.85rem',
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'vertical',
  lineHeight: '1.4'
};

const formActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  borderTop: '1px solid rgba(255,255,255,0.06)',
  paddingTop: '20px',
  marginTop: '8px'
};

const btnCancelStyle = {
  padding: '10px 20px',
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer'
};

const btnSubmitStyle = {
  padding: '10px 20px',
  backgroundColor: '#C1121F',
  border: 'none',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer'
};
