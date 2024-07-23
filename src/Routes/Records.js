import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase-config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import "./Record.css";
import { auth } from "../firebase-config";

const Records = () => {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "records");
  const [loading, setLoading] = useState(true);
  const userEmail = auth.currentUser ? auth.currentUser.email : '';

  useEffect(() => {
    const getUsers = async () => {
      try {
        const recordsQuery = query(userCollectionRef, orderBy("createdAt", "desc"));
        const data = await getDocs(recordsQuery);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [userCollectionRef]);

  return (
    <>
      <Navbar />
      <div className={loading ? "visibleloader" : "hideloader"}></div>
      <div className="content-record">
        {users.map((user) => (
          <div key={user.id} className={user.status === "release" ? "box-record-release" : "box-record-reload"}>
            <div className="upper-row">
              <div className='udata uname'>{user.name}</div>
              <div className="udata ustatus">{user.status}</div>
              <div className="udata uquantity">{user.quantity}</div>
              
            </div>
            <div className='lower-row'>
              <div className='ldata lmail'>{userEmail}</div>
              <div className="ldata ldate">{user.createdAt && user.createdAt.toDate().toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Records;
