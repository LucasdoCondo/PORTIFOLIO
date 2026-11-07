import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      );
    }

    // TODO: Integrar com serviço de e-mail (Resend, Formspree, SendGrid, etc.)
    console.log('Nova mensagem de contato:', { name, email, message });

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Erro ao processar a mensagem.' },
      { status: 500 }
    );
  }
}