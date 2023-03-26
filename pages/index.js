import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

const index = () => {
    const [Question, setQuestion] = useState("")
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    async function onSubmit(event) {
        event.preventDefault();
        if (loading) {
            return;
        }
        setLoading(true);
        setResult('');
        const response = await fetch('/api/quran', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Question}),
        });
        const data = await response.json();
        setResult(data.result.replaceAll('\\n', '<br />'));
        setLoading(false);
    }
  return (
    <div>
          <main className={styles.main}>
              <h3>
                Answer Of Your Question based on your Quran
              </h3>
              <form onSubmit={onSubmit}>
             

               


                  <label>
                        Question
                  </label>
                  <input
                      type="text"
                      name="Question"
                      placeholder="Enter the Question"
                      value={Question}
                      onChange={(e) => setQuestion(e.target.value)}
                  />
                  <input type="submit" value="Give Answer" />
              </form>
              {loading && (
                  <div>
                      <h3>Looking for the best Answer...</h3>
                  </div>
              )}
              <div
                  dangerouslySetInnerHTML={{ __html: result }}
              />
          </main>
    </div>
  )
}

export default index