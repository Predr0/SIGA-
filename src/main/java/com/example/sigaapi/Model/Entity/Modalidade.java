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

public class Modalidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String descricao;
    private int alunoId;
    private int funcionarioId;

    @ManyToOne
    private Aluno aluno;

    @ManyToOne
    private Funcionario funcionario;

}


