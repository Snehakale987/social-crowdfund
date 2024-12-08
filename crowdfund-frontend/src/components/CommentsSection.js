import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CommentsSection.css';
import { useAuth } from '../context/AuthContext'; // AuthContext for user info


function CommentsSection({ causeId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Fetch comments when the component loads
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://test-797390839.us-east-1.elb.amazonaws.com/api/causes/${causeId}/comments`);
                setComments(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching comments:', err);
                setLoading(false);
            }
        };
        fetchComments();
    }, [causeId]);

    // Handle new comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setError('Comment cannot be empty.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://test-797390839.us-east-1.elb.amazonaws.com/api/causes/${causeId}/comments`,
                { text: newComment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const commentNew = response.data.comment;
            commentNew.user = {}
            commentNew.user.name = user.name

            // Update comments list with the new comment
            setComments([response.data.comment, ...comments]);
            setNewComment('');
            setError('');
        } catch (err) {
            console.error('Error adding comment:', err);
            setError('Failed to post the comment.');
        }
    };

    if (loading) {
        return <p>Loading comments...</p>;
    }

    return (
        <section className="comments-section">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <p className="comment-text">{comment.text}</p>
                        <span className="comment-user">{comment.user?.name || 'Anonymous'}</span>
                        <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <textarea
                    className="comment-input"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button type="submit" className="submit-comment-button">
                    Post Comment
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </section>
    );
}

export default CommentsSection;
