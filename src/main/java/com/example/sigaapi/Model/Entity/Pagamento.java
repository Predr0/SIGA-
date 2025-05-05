package main.sigaapi.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int alunoId;
    private int funcionarioId;
    private double valor;
    private String datePagamento;
    private String formaPagamento;

    @ManyToOne
    private Aluno aluno;

    @ManyToOne
    private Funcionario funcionario;
}
