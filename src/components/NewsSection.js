import React, { useState, useEffect } from 'react';
import './NewsSection.css';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const allNewsItems = [
    {
      id: 1,
      title: 'Field Safety Notices: 17 to 21 March 2025',
      date: 'March 26, 2025',
      excerpt: 'List of safety notices published by the Medicines and Healthcare products Regulatory Agency for March 17-21, 2025.',
      url: 'https://www.gov.uk/drug-device-alerts/field-safety-notices-17-to-21-march-2025'
    },
    {
      id: 2,
      title: 'Android Security Bulletin—March 2025',
      date: 'March 20, 2025',
      excerpt: 'Details of security vulnerabilities affecting Android devices, including critical remote code execution issues.',
      url: 'https://source.android.com/docs/security/bulletin/2025-03-01'
    },
    {
      id: 3,
      title: 'NOPD Announces Preliminary Crime Statistics for March 16-22, 2025',
      date: 'March 24, 2025',
      excerpt: 'Weekly report on citywide crime statistics compiled by the NOPD Analytics Unit.',
      url: 'https://nopdnews.com/post/march-2025/nopd-announces-preliminary-crime-statistics-fo-(2)/'
    },
    {
      id: 4,
      title: 'Safety Alert: March 30, 2025 | 8:38 a.m.',
      date: 'March 30, 2025',
      excerpt: 'MUPD responded to reports of shots fired and issued safety instructions for the community.',
      url: 'https://today.marquette.edu/alert/safety-alert-march-30-2025-838-a-m/'
    },
    {
      id: 5,
      title: 'National Safety Day 2025 Observed on March 4',
      date: 'March 4, 2025',
      excerpt: 'A day dedicated to raising awareness about safety and promoting precautionary measures across industries in India.',
      url: 'https://economictimes.com/news/new-updates/national-safety-day-2025-why-india-celebrates-march-4-as-a-day-to-raise-awareness-on-safety-know-its-history-and-importance/articleshow/118695334.cms'
    },
    {
      id: 6,
      title: 'Crime Report: March 24, 2025 - Arlington County',
      date: 'March 24, 2025',
      excerpt: 'Significant criminal incidents reported in Arlington County, including robberies and burglaries.',
      url: 'https://www.arlingtonva.us/About-Arlington/Newsroom/Articles/2025/Crime-Report-March-24-2025'
    },
    {
      id: 7,
      title: 'National Safety Day History and Significance',
      date: 'March 4, 2025',
      excerpt: 'Insights into the history and importance of National Safety Day in India, promoting workplace safety standards.',
      url: 'https://www.business-standard.com/lifestyle/national-safety-day-2025-know-history-significance-theme-and-more-nc-125030400281_1.html'
    },
    {
      id: 8,
      title: 'Cybercrime Unit Arrests Nationwide Phishing Gang',
      date: 'March 18, 2025',
      excerpt: 'Arrest of suspects involved in phishing scams that stole millions through fake customer care calls.',
      url: 'https://www.hindustantimes.com/tech/cybercrime-phishing-arrests'
    },
    {
      id: 9,
      title: 'Counterfeit Medicine Network Exposed in Multi-State Operation',
      date: 'February 20, 2025',
      excerpt: 'Authorities seize fake pharmaceuticals worth ₹5 crore from illegal distribution centers.',
      url: 'https://www.business-standard.com/article/current-affairs/counterfeit-medicine-bust'
    },
    {
      id: 10,
      title: 'Financial Fraud Alert on Fake Investment Apps',
      date: 'February 5, 2025',
      excerpt: 'Warning issued about malicious applications mimicking legitimate investment platforms to steal data.',
      url: 'https://www.moneycontrol.com/news/business/fake-investment-apps-warning'
    },
    {
      id: 11,
      title: 'New Anti-Stalking Legislation Passed with Stricter Penalties',
      date: 'January 25, 2025',
      excerpt: 'Expanded powers granted to law enforcement agencies to protect harassment victims under new laws.',
      url: 'https://thewire.in/government/anti-stalking-legislation-passed'
    },
    {
      id: 12,
      title: 'Family Safety App Reaches Milestone of Two Million Users',
      date: 'February 25, 2025',
      excerpt: 'Government-backed app offers real-time location tracking and emergency response services for families.',
      url: 'https://www.livemint.com/technology/apps/family-safety-app-milestone'
    },
    {
      id: 13,
      title: 'International Job Scam Network Dismantled by Authorities',
      date: 'March 10, 2025',
      excerpt: 'Scammers promising high-paying overseas jobs defrauded victims of over ₹80 lakh before being caught.',
      url: 'https://www.thehindu.com/news/national/job-scam-network'
    },
    {
      id: 14,
      title: 'Cross-Border Human Trafficking Ring Dismantled',
      date: 'January 30, 2025',
      excerpt: 'Joint operation rescues 32 victims and arrests 8 suspects in coordinated raids...',
      url: 'https://www.indiatoday.in/india/story/human-trafficking-ring-bust'
    },
    {
      id: 15,
      title: 'New Anti-Stalking Legislation Passed with Stricter Penalties',
      date: 'January 25, 2025',
      excerpt: 'Law enforcement agencies given expanded powers to protect harassment victims...',
      url: 'https://thewire.in/government/anti-stalking-legislation-passed'
    }
  ];

  const getRandomNewsItems = (count) => {
    const shuffled = [...allNewsItems];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  };

  const fetchRandomNews = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getRandomNewsItems(3));
      }, 800);
    });
  };

  useEffect(() => {
    fetchRandomNews()
      .then(data => {
        setNews(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="news-loading">Loading safety alerts...</div>;
  }

  return (
    <div className="news-section">
      <h2>Safety Alerts & Updates</h2>
      <div className="news-grid">
        {news.map(item => (
          <article key={item.id} className="news-card">
            <h3>{item.title}</h3>
            <time className="news-date">{item.date}</time>
            <p className="news-summary">{item.excerpt}</p>
            <a href={item.url} className="news-link" target="_blank" rel="noopener noreferrer">
              View Details →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;