import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Acompanhamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int alunoId;
    private String descricao;
    private String date;
    private int funcionarioId;

    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor

    public class Aluno {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String nome;
        private String cpf;
        private String email;
        private String telefone;
        private String endereco;
        private String dataNascimento;
        private String login;
        private String senha;

    }
}

@manytoone