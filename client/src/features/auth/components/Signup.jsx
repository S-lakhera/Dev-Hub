import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api/axios';
import { useNavigate, Link } from 'react-router';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Creating account...');
        try {
            const { data } = await api.post('/auth/register', formData);
            setUser(data.user);
            toast.success('Account created! Welcome to DevHub', { id: loadingToast });
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed', { id: loadingToast });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your details to get started with DevHub</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input 
                                placeholder="John Doe" 
                                required 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input 
                                type="email" 
                                placeholder="name@example.com" 
                                required 
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input 
                                type="password" 
                                required 
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">Sign Up</Button>
                        <p className="text-sm text-center text-slate-600">
                            Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Signup;