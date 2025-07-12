import { useState, useEffect } from 'react';
import { getRoadmapHistory } from '../services/api';

export default function RoadmapHistory({ userEmail }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getRoadmapHistory(userEmail);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userEmail]);

  if (loading) return <div>Loading your history...</div>;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-lg font-semibold">Your Roadmap History</h2>
      </div>
      
      <div className="h-96 overflow-y-auto p-4">
        {history.length === 0 ? (
          <p className="text-gray-500">No roadmaps generated yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <h3 className="font-medium">{item.prompt}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(item.created_at).toLocaleString()}
                </p>
                <pre className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">
                  {item.roadmap}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}