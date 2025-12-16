"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Send } from "lucide-react";
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    phone: "", 
    message: "" 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API Call Logic yahan aayega
    setSubmitted(true);
  };

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header Title */}
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have a technical query, partnership proposal, or just want to connect? We'd love to hear from you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          
          {/* LEFT PANEL: Contact Info */}
          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            <p className={styles.infoText}>
              Reach out to our team via any of the channels below. We typically respond within 24 business hours.
            </p>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Phone size={22} /></div>
                <div className={styles.itemContent}>
                  <h3>Tech Support</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><Mail size={22} /></div>
                <div className={styles.itemContent}>
                  <h3>General Inquiry</h3>
                  <p>hello@mytechblog.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><MapPin size={22} /></div>
                <div className={styles.itemContent}>
                  <h3>HQ Location</h3>
                  <p>123 Innovation Labs, Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className={styles.socialSection}>
              <span className={styles.socialLabel}>Connect With Us</span>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink} aria-label="Facebook"><Facebook size={20} /></a>
                <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
                <a href="#" className={styles.socialLink} aria-label="Youtube"><Youtube size={20} /></a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Form */}
          <div className={styles.formPanel}>
            {submitted ? (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>🚀</span>
                <h2>Message Sent Successfully!</h2>
                <p>Our team has received your inquiry and will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className={styles.submitButton}
                  style={{ marginTop: '30px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                
                {/* Row 1: Name */}
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>First Name</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Ana"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input 
                      type="text" 
                      className={styles.input} 
                      placeholder="Williams"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                {/* Row 2: Contact */}
                <div className={styles.row}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address</label>
                    <input 
                      type="email" 
                      className={styles.input} 
                      placeholder="ana@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input 
                      type="tel" 
                      className={styles.input} 
                      placeholder="+91 90000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Message</label>
                  <textarea 
                    className={styles.textarea} 
                    placeholder="How can we help you today?"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section - Fixed URL */}
        <div className={styles.mapWrapper}>
          <iframe 
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792671500695!2d72.8776553149015!3d19.076090557022135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1633023222524!5m2!1sen!2sin" 
            className={styles.mapFrame} 
            allowFullScreen={true} 
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </main>
  );
}