package com.regis.mural.ideias.controller;

import com.regis.mural.ideias.controller.request.IdeaRequest;
import com.regis.mural.ideias.controller.response.IdeaResponse;
import com.regis.mural.ideias.mapper.IdeaMapper;
import com.regis.mural.ideias.model.Idea;
import com.regis.mural.ideias.service.IdeaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;


/**
 * @author Regis Michael
 * @since 2025-09-17
 */

@RestController
@AllArgsConstructor
@RequestMapping("/ideias")
public class IdeaController {

    private final IdeaMapper mapper;
    private final IdeaService ideaService;

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody @Valid IdeaRequest request,
            UriComponentsBuilder uriBuilder){
        Idea model = mapper.toModel(request);
        model = ideaService.create(model);
        IdeaResponse response = mapper.toResponse(model);
        URI uri = uriBuilder.path("/ideias/{id}").buildAndExpand(model.getId()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping
    public ResponseEntity<List<IdeaResponse>> findAll(){
        List<Idea> listModel = ideaService.findAll();
        List<IdeaResponse> listResponse = mapper.toResponse(listModel);
        return ResponseEntity.ok(listResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        Idea model = ideaService.findById(id);
        System.out.println("DEBUG >>> Objeto vindo do serviço: " + model);
        IdeaResponse response = mapper.toResponse(model);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IdeaResponse> update(
            @PathVariable Long id, @RequestBody @Valid IdeaRequest request){

        Idea modelUpdate = mapper.toModel(request);
        Idea modelUpdated = ideaService.update(id, modelUpdate);
        IdeaResponse response = mapper.toResponse(modelUpdated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        ideaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

