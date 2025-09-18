package com.regis.mural.ideias.service;

import com.regis.mural.ideias.mapper.IdeaMapper;
import com.regis.mural.ideias.model.Idea;
import com.regis.mural.ideias.repository.RepositoryIdea;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Regis Michael
 * @since 2025-09-17
 */
@Service
@AllArgsConstructor
public class IdeaService {

    private final RepositoryIdea repositoryIdea;
    private final IdeaMapper mapper;

    @Transactional
    public Idea create(Idea ideaModel) {
        repositoryIdea.save(ideaModel);
        return findById(ideaModel.getId());
    }

    public List<Idea> findAll(){
        return repositoryIdea.findAll();
    }

    public Idea findById(Long id) {
        return repositoryIdea.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ideia não encontrado"));
    }

    @Transactional
    public Idea update(Long id, Idea ideaModelUpdate){
        Idea ideaModelCurrent = findById(id);
        mapper.toModel(ideaModelCurrent, ideaModelUpdate);

        repositoryIdea.save(ideaModelCurrent);
        return findById(id);
    }

    public void delete(long id){
        Idea ideaModel = findById(id);
        repositoryIdea.delete(ideaModel);
    }

}
