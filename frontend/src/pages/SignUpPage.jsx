import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  MessageSquare,
  User,
  Mail,
  Lock,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
export default function SignUpPage() {
  const iconStyle = "size-5 text-base-content/40";
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  function validateForm() {
    if (!formData.fullName.trim()) return toast.error("Повне ім'я обов'язкове");
    if (!formData.email.trim()) return toast.error("Пошта обов'язкова");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Неправильний формат пошти");
    if (!formData.password) return toast.error("Пароль обов'язковий");
    if (formData.password.length < 6)
      return toast.error("Пароль повинен бути більше 6 символів");

    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Створити акаунт</h1>
              <p className="text-base-content/60">
                Почати зі безкоштовним акаунтом
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Повне ім'я</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={iconStyle} />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Іван Іванов"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Пошта</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={iconStyle} />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Пароль</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={iconStyle} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={iconStyle} />
                  ) : (
                    <Eye className={iconStyle} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Завантаження...
                </>
              ) : (
                "Створити акаунт"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Ти вже маєш акаунт?{" "}
              <Link to="/login" className="link link-primary">
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Приєднуйся до нашого ком'юніті"
        subtitle="Зв'язуйся з друзями, ділись моментами та залишайся на зв'язку зі своїми близькими."
      />
    </div>
  );
}
