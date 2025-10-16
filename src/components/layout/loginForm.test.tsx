import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginForm from "./loginForm";
import { loginInputSchema, LoginInputSchema } from "@/schemas/loginSchema";
import { redirect } from "next/navigation";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("LoginForm", () => {
  it("renderiza campos e botão", () => {
    render(<LoginForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("mostra erro se campos obrigatórios estiverem vazios", async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/Usuário obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/Senha obrigatória/i)).toBeInTheDocument();
  });

  it("faz login com credenciais corretas", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: "Login realizado com sucesso!",
      }),
    });

    render(<LoginForm />, { wrapper: Wrapper });

    await userEvent.type(screen.getByLabelText(/Usuário/i), "admin");
    await userEvent.type(screen.getByLabelText(/Senha/i), "password");
    await userEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith("/api/auth", expect.objectContaining({
            method: "POST",
            body: JSON.stringify({ user: "admin", password: "password" }),
        }));
      expect(redirect).toHaveBeenCalledWith("/management");
    });
  });

  it("mostra erro com credenciais incorretas", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        message: "Usuário ou senha inválidos",
      }),
    });

    render(<LoginForm />, { wrapper: Wrapper });

    await userEvent.type(screen.getByLabelText(/Usuário/i), "user");
    await userEvent.type(screen.getByLabelText(/Senha/i), "1234");
    await userEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Usuário ou senha inválidos/i)).toBeInTheDocument();
    });
  });
});
