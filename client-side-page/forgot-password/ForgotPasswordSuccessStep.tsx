import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";

export function ForgotPasswordSuccessStep() {
  const router = useRouter();

  return (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Icon
            icon="material-symbols:check-circle-outline-rounded"
            className="size-9"
          />
        </div>
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Kata sandi berhasil diatur ulang
        </h1>
        <p className="text-sm text-muted-foreground">
          Kata sandi Anda berhasil diatur ulang. Sekarang Anda bisa masuk
          menggunakan kata sandi baru.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button
          fullWidth
          size="lg"
          onClick={() => router.push(APP_URL.LOGIN)}
        >
          Kembali ke Halaman Masuk
        </Button>
      </div>
    </>
  );
}
