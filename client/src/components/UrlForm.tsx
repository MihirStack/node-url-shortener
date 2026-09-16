import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Link2 } from "lucide-react";

const schema = z.object({
  originalUrl: z
    .url("Enter a valid URL")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must start with http:// or https://",
    ),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  loading: boolean;

  onSubmit: (originalUrl: string) => Promise<void>;
}

export default function UrlForm({ loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const submit = async (values: FormValues) => {
    await onSubmit(values.originalUrl);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="url-form">
      <div className="input-wrapper">
        <Link2 size={20} />

        <input
          {...register("originalUrl")}
          placeholder="Paste your long URL here..."
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      {errors.originalUrl && (
        <p className="form-error">{errors.originalUrl.message}</p>
      )}
    </form>
  );
}
