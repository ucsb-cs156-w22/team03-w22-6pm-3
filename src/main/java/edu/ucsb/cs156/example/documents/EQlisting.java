package edu.ucsb.cs156.example.documents;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EQlisting{

    private String type;
    private EQmetadata metadata;
    private List<Double> bbox;
    private List<EQfeature> features;
}