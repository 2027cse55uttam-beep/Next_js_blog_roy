import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export default function About() {
  return (
    <main className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerBadge}>Our Story</span> 
        <h1 className={styles.headerTitle}>
          Built by developers, for developers
        </h1>
        <p className={styles.headerDesc}>
          We understand the unique challenges of learning Full Stack Development because we have been there ourselves.
        </p>
      </div>

      {/* Timeline Section */}
      <div className={styles.timeline}>
        <div className={styles.timelineLine}></div>

        {/* Item 1 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNumber}>1</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.timelineTitle}>The Beginning</h3>
            <p className={styles.timelineDesc}>
              Started in 2023 by passionate developers who were frustrated with scattered tutorials and wanted a unified learning platform.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNumber}>2</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.timelineTitle}>First Version Launch</h3>
            <p className={styles.timelineDesc}>
              Released our first blog version in 2024, focusing on core concepts like Next.js, Django, and modern deployment strategies.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className={styles.timelineItem}>
          <div className={styles.timelineNumber}>3</div>
          <div className={styles.timelineContent}>
            <h3 className={styles.timelineTitle}>Growing Community</h3>
            <p className={styles.timelineDesc}>
              Today, we serve thousands of readers worldwide, helping them build scalable applications with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <h2 className={styles.teamTitle}>Meet Our Leadership</h2>
          <p className={styles.teamDesc}>
            A team of engineers dedicated to sharing knowledge.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {/* Member 1 */}
          <div className={styles.teamMember}>
            <div className={styles.memberImageWrapper}>
              {/* External Image use kar rahe hain */}
              <img 
                src="https://landinggo.com/assets/img/stock/team/team-40x40-1.webp" 
                alt="Sarah Chen" 
                className={styles.memberImage} 
              />
            </div>
            <h4 className={styles.memberName}>Sarah Chen</h4>
            <p className={styles.memberRole}>Lead Developer</p>
            <p className={styles.memberBio}>Full Stack Expert with 10 years of experience in React & Python.</p>
          </div>

          {/* Member 2 */}
          <div className={styles.teamMember}>
            <div className={styles.memberImageWrapper}>
              <img 
                src="https://landinggo.com/assets/img/stock/team/team-40x40-2.webp" 
                alt="Michael Rodriguez" 
                className={styles.memberImage} 
              />
            </div>
            <h4 className={styles.memberName}>Michael Rodriguez</h4>
            <p className={styles.memberRole}>CTO & Co-founder</p>
            <p className={styles.memberBio}>Specializes in scalable architecture and cloud infrastructure.</p>
          </div>

          {/* Member 3 */}
          <div className={styles.teamMember}>
            <div className={styles.memberImageWrapper}>
              <img 
                src="https://landinggo.com/assets/img/stock/team/team-40x40-3.webp" 
                alt="Emily Taylor" 
                className={styles.memberImage} 
              />
            </div>
            <h4 className={styles.memberName}>Emily Taylor</h4>
            <p className={styles.memberRole}>Head of Content</p>
            <p className={styles.memberBio}>Technical writer passionate about simplifying complex topics.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span>Currently helping 3,000+ developers</span>
        </div>
        <div>
          <Link href="/contact" className={styles.ctaButton}>
            Get in touch with our team
          </Link>
          <p className={styles.ctaNote}>Let's discuss how we can help you grow</p>
        </div>
      </div>

    </main>
  );
}