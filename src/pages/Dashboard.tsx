import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Recommendation {
  id: string;
  category: string;
  recommendation: string;
  sources: string[];
  sourceTags: string[];
  needTags: string[];
}

const Dashboard: React.FC = () => {
  const { data: recommendations, isLoading } = useQuery<Recommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'recommendations'));
      return querySnapshot.docs.map(doc => doc.data() as Recommendation);
    },
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  const categories = recommendations?.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const totalRecommendations = recommendations?.length || 0;
  const totalSources = recommendations?.reduce((acc, curr) => acc + curr.sources.length, 0) || 0;
  const uniqueSourceTags = new Set(recommendations?.flatMap(r => r.sourceTags) || []).size;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Recommendations
              </Typography>
              <Typography variant="h3">
                {totalRecommendations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Sources
              </Typography>
              <Typography variant="h3">
                {totalSources}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unique Source Tags
              </Typography>
              <Typography variant="h3">
                {uniqueSourceTags}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Categories Breakdown */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recommendations by Category
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(categories).map(([category, count]) => (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {category}
                      </Typography>
                      <Typography variant="h4">
                        {count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 